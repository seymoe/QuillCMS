import fs from 'fs'
import xss from 'xss'
import Post from '../models/Post'
import PostTag from '../models/PostTag'
import PostCategory from '../models/PostCategory'
import User from '../models/User'
import shortid from 'shortid'
import Marked from 'marked'
const highlight = require('highlight.js')
import { log, renderApiData, renderApiErr, checkCurrentId } from '../utils'

// Marked配置
let renderer = new Marked.Renderer()
renderer.codespan = (code, lang) => {
  log('codespan', code)
  return '<code class="codespan">' + code.replace(/amp;/g, '') + '</code>'
}
Marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: false,
  smartypants: false,
  highlight: function (code) {
    code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    return highlight.highlightAuto(code).value
  }
})

// XSS配置
let options = {
  whiteList: {
    a: ['id', 'class', 'target', 'href', 'title'],
    abbr: ['id', 'class', 'title'],
    address: ['id', 'class'],
    area: ['id', 'class', 'shape', 'coords', 'href', 'alt'],
    article: ['id', 'class',],
    aside: ['id', 'class',],
    audio: ['id', 'class', 'autoplay', 'controls', 'loop', 'preload', 'src'],
    b: ['id', 'class',],
    bdi: ['id', 'class', 'dir'],
    bdo: ['id', 'class', 'dir'],
    big: ['id', 'class',],
    blockquote: ['id', 'class', 'cite'],
    br: ['id', 'class',],
    caption: ['id', 'class',],
    center: ['id', 'class',],
    cite: ['id', 'class',],
    code: ['id', 'class',],
    col: ['id', 'class', 'align', 'valign', 'span', 'width'],
    colgroup: ['id', 'class', 'align', 'valign', 'span', 'width'],
    dd: ['id', 'class',],
    del: ['id', 'class', 'datetime'],
    details: ['id', 'class', 'open'],
    div: ['id', 'class',],
    dl: ['id', 'class',],
    dt: ['id', 'class',],
    em: ['id', 'class',],
    font: ['id', 'class', 'color', 'size', 'face'],
    footer: ['id', 'class',],
    h1: ['id', 'class',],
    h2: ['id', 'class',],
    h3: ['id', 'class',],
    h4: ['id', 'class',],
    h5: ['id', 'class',],
    h6: ['id', 'class',],
    header: ['id', 'class',],
    hr: ['id', 'class',],
    i: ['id', 'class',],
    img: ['id', 'class', 'src', 'alt', 'title', 'width', 'height'],
    ins: ['id', 'class', 'datetime'],
    li: ['id', 'class'],
    mark: ['id', 'class',],
    nav: ['id', 'class',],
    ol: ['id', 'class',],
    p: ['id', 'class',],
    pre: ['id', 'class',],
    s: ['id', 'class',],
    section: ['id', 'class',],
    small: ['id', 'class',],
    span: ['id', 'class',],
    sub: ['id', 'class',],
    sup: ['id', 'class',],
    strong: ['id', 'class',],
    table: ['id', 'class', 'width', 'border', 'align', 'valign'],
    tbody: ['id', 'class', 'align', 'valign'],
    td: ['id', 'class', 'width', 'rowspan', 'colspan', 'align', 'valign'],
    tfoot: ['id', 'class', 'align', 'valign'],
    th: ['id', 'class', 'width', 'rowspan', 'colspan', 'align', 'valign'],
    thead: ['id', 'class', 'align', 'valign'],
    tr: ['id', 'class', 'rowspan', 'align', 'valign'],
    tt: ['id', 'class',],
    u: ['id', 'class',],
    ul: ['id', 'class',],
    video:
      ['id', 'class', 'autoplay',
        'controls',
        'loop',
        'preload',
        'src',
        'height',
        'width']
  }
}

let checkCreatePostFields = (formData, req) => {
  let hasLogin = req.session.userLogined
  let userInfo = req.session.userInfo
  if (!hasLogin || userInfo.id !== formData.author) {
    return {
      status: false,
      msg: '身份验证失败'
    }
  }

  if (!/^quillcms_post_mark_\d{13}$/.test(formData.fakemark)) {
    return {
      status: false,
      msg: '参数错误'
    }
  }

  if (formData.title.length === 0
    || formData.title.length > 40
    || (formData.sub_title && formData.sub_title.length > 40)
    || formData.description.length === 0
    || formData.description.length > 80
    || formData.content.length === 0) {
    return {
      status: false,
      msg: '标题或简介长度校验不通过'
    }
  }
  return {
    status: true,
    msg: '校验成功'
  }
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
      let cateName = fields.cateName  // 分类名称
      let tagName = fields.tagName  // 文章标签
      let state = fields.state  // 文章状态 published draft
      let user = fields.user  // 用户ID
      let from = fields.from  // 文章类型 1 0
      let searchKey = fields.searchKey  // 搜索词

      // 查询参数配置
      let queryObj = { auth: 'public' }, sortObj = { create_time: -1 }, files = null, postList = [], totalCounts = 0

      log('type of isTop ->', typeof (isTop))
      if (isTop === 'true') {
        queryObj.isTop = true
      } else if (isTop === 'false') {
        queryObj.isTop = false
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

      // 分类名称
      if (cateName && cateName !== '首页') {
        let targetCateName = await PostCategory.findOne({ name: cateName })
        if (targetCateName) {
          queryObj.categories = targetCateName._id
        }
      }

      // 文章标签
      if (tagName) {
        let targetTag = await PostTag.findOneAndUpdate({ name: tagName }, { '$inc': { 'clicks': 1 } })
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

      if (user && shortid.isValid(user)) {
        queryObj.author = user
      }

      log('queryObj-> ', queryObj)

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
      return res.send(renderApiData(req, res, 200, '文章列表获取成功', postObj))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
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
      if (!validateResult.status) {
        return res.status(500).send(renderApiErr(req, res, 500, validateResult.msg))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }

    const obj = {
      title: fields.title.trim(),
      sub_title: fields.sub_title || '',
      description: fields.description,
      cover: fields.cover,
      content: xss(fields.content),
      auth: fields.auth === 'secret' ? 'secret' : 'public',
      state: fields.state === 'draft' ? 'draft' : 'published',
      isTop: fields.isTop === 'true' ? true : false,
      from: fields.from === '1' ? 1 : 0,
      categories: fields.categories,
      tags: fields.tags,
      content_type: fields.content_type === 'T' ? 'T' : 'M',
      author: fields.author
    }

    // 处理用户自定义添加的标签
    if (obj.tags.length > 0) {
      let tagArr = []
      for (let i = 0; i < obj.tags.length; i++) {
        tagArr.push((async (index) => {
          if (!shortid.isValid(obj.tags[i])) {
            // 如果不是合法id，则进行校验存储
            if (obj.tags[index].length <= 20) {
              try {
                // 存储到数据库
                let _obj = new PostTag({ name: obj.tags[index] })
                let newTag = await _obj.save()
                return newTag._id
              } catch (err) {
                log('创建标签出问题', err)
                return ''
              }
            } else {
              return ''
            }
          } else {
            // 如果是，则查询数据库是否存在
            try {
              let _ftag = await PostTag.findOne({ _id: obj.tags[index] })
              if (_ftag && _ftag._id === obj.tags[index]) {
                return _ftag._id
              } else {
                return ''
              }
            } catch (err) {
              log('查询存在的标签出问题', err)
              return ''
            }
          }
        })(i))
      }

      let resultTagArr = await Promise.all(tagArr)
      resultTagArr = resultTagArr.filter((item) => {
        return item !== ''
      })
      obj.tags = resultTagArr
    }

    log(obj)

    const newPost = new Post(obj)

    try {
      let postObj = await newPost.save()
      // 更新用户发文数
      await User.findOneAndUpdate({ _id: obj.author }, { '$inc': { postsNum: 1 } })

      return res.send(renderApiData(req, res, 200, '文章创建成功', { id: postObj._id }))
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
      let validateResult = checkCreatePostFields(fields, req)
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
      sub_title: fields.sub_title,
      description: fields.description,
      cover: fields.cover,
      content: xss(fields.content),
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

    try {
      let item_id = fields._id
      let oldPost = await Post.findOne({ _id: item_id })
      // 如果新传来的图片路径和之前的图片路径不同，则删掉之前的图片并更新
      if (oldPost.cover !== obj.cover) {
        if (oldPost.cover.indexOf('/upload/images/') >= 0) {
          // 文件存储于服务器
          let _path = process.cwd() + '/static' + oldPost.cover
          log('imgpath -> ', _path)
          if (fs.existsSync(_path)) {
            // 存在，删掉
            fs.unlinkSync(_path)
          }
        }
      }

      await Post.findOneAndUpdate({ _id: item_id }, { $set: obj })
      return res.send(renderApiData(req, res, 200, '文章更新成功', { id: item_id }))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 获取一篇文章
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getOne(req, res, next) {
    let _session = req.session
    log('3 + ', _session)
    try {
      let targetId = req.params.id
      let getFrom = req.query.getFrom
      let queryObj = { _id: targetId }
      let updateObj = { '$inc': { 'clicksNum': 1 } }

      // 如果详情拉取来自管理后台，则不进行点击数增加
      if (getFrom === 'server') {
        updateObj = {}
      }

      let content = await Post.findOneAndUpdate(queryObj, updateObj).populate([
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

      content = content.toObject()

      if (getFrom !== 'server') {
        if (content.content) {
          let tok = Marked.lexer(content.content)
          let text = Marked.parser(tok).replace(/<pre>/ig, '<pre class="hljs">')
          log('text -> ', text)
          content.content = xss(text, options)
        }
        // 更具session判断用户是否登陆，如果是登陆状态则判断是否已经点赞了该文章
        if (_session.userLogined) {
          log(_session)
          let userId = _session.userInfo.id
          if (userId && content.like_users.indexOf(userId) > -1) {
            content.hasLiked = true
          } else {
            content.hasLiked = false
          }
          // 收藏
          if (userId && content.collect_users.indexOf(userId) > -1) {
            content.hasCollected = true
          } else {
            content.hasCollected = false
          }
        } else {
          content.hasLiked = false
          content.hasCollected = false
        }
      }

      log(content.content)

      return res.send(renderApiData(req, res, 200, '获取成功', content || {}))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
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
        return res.send(renderApiErr(req, res, 500, errMsg))
      }

      let postAuthor = await Post.findOne({ _id: id }, 'author')
      log(postAuthor)
      if (postAuthor.author) {
        await Post.remove({ _id: id })
        // 用户的发文数量应该减 1
        await User.findOneAndUpdate({ _id: postAuthor.author }, { '$inc': { postsNum: -1 } })
        return res.send(renderApiData(req, res, 200, '删除成功', {}))
      } else {
        return res.send(renderApiErr(req, res, 500, errMsg))
      }

    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 用户喜欢文章
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async updateLikeNum(req, res, next) {
    let postId = req.body.id
    let userId = req.session.userInfo.id
    // 校验数据
    if (!shortid.isValid(postId) || !shortid.isValid(userId)) {
      return res.status(500).send(renderApiErr(req, res, 500, '参数错误'))
    }
    try {
      let oldPost = await Post.findOne({ _id: postId })
      if (!oldPost || (oldPost.like_users).indexOf(userId) > -1) {
        return res.status(500).send(renderApiErr(req, res, 500, '更新失败'))
      } else {
        let newPost = await Post.findOneAndUpdate({ _id: postId }, { '$inc': { 'likesNum': 1 }, '$push': { 'like_users': userId } })
        return res.send(renderApiData(req, res, 200, '更新成功', { likesNum: newPost.likesNum + 1, hasLiked: true }))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /* 用户收藏文章
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async updateCollectNum(req, res, next) {
    let postId = req.body.id
    let userId = req.session.userInfo.id
    // 校验数据
    if (!shortid.isValid(postId) || !shortid.isValid(userId)) {
      return res.status(500).send(renderApiErr(req, res, 500, '参数错误'))
    }
    try {
      let oldPost = await Post.findOne({ _id: postId })
      if (!oldPost || (oldPost.collect_users).indexOf(userId) > -1) {
        return res.status(500).send(renderApiErr(req, res, 500, '更新失败'))
      } else {
        let newPost = await Post.findOneAndUpdate({ _id: postId }, { '$inc': { 'collectionsNum': 1 }, '$push': { 'collect_users': userId } })
        return res.send(renderApiData(req, res, 200, '更新成功', { collectionsNum: newPost.collectionsNum + 1, hasCollected: true }))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  }
}
