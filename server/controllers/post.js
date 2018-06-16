import Post from '../models/Post'
import validator from 'validator'
import { log, renderApiData, renderApiErr } from '../../utils/util'

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
  getList(req, res, next) {
    let { page, pageSize, sort, order, isTop} = req.query
    let conditions = {}
    let sortable = {}

    // 每页数据条数
    pageSize = parseInt(pageSize)
    pageSize = (pageSize >= 1 || pageSize <= 100) ? pageSize : 20

    // 页数
    page = parseInt(page)
    page = page > 1 ? page : 1

    // 设置查询参数
    if (isTop === 'yes') {
      conditions.isTop = true
    }
    // 设置排序参数
    if (sort) {
      sortable[sort] = -1
    }
    if (order === 'asc') {
      sortable[sort] = 1
    }

    // 声明相关参数
    let totalCounts = 0   // 总条数
    let totalpages = 0    // 总页数
    let _data = []
    let msg = ''

    let option = { skip: (page - 1) * pageSize, limit: pageSize }

    let query = Post.find(conditions)

    query.sort(sortable).count((err, count) => {
      console.log('count-> ', count)
      totalCounts = count
      if (totalCounts < pageSize) {
        totalpages = 1
      } else {
        if (totalCounts % pageSize === 0) {
          totalpages = totalCounts / pageSize
        } else {
          totalpages = Math.floor(totalCounts / pageSize) + 1
        }
      }
      console.info(totalpages)

      if (page > totalpages) {
        let obj = {
          success: false,
          currentPage: page,
          pageSize: pageSize,
          totalCounts: totalCounts,
          totalPages: totalpages,
          data: [],
          msg: '页数超过总页数，无数据',
        }
        return res.json(obj)
      }

      // 开始查询
      query.skip(option.skip).limit(option.limit).exec('find', (err, goods) => {
        console.log(err)
        if (err) {
          let obj = {
            success: false,
            currentPage: page,
            pageSize: pageSize,
            totalCounts: totalCounts,
            totalPages: totalpages,
            data: [],
            msg: '查询数据库出错',
          }
          return res.json(obj)
        } else {
          let obj = {
            success: true,
            currentPage: page,
            pageSize: pageSize,
            totalCounts: totalCounts,
            totalPages: totalpages,
            data: goods,
            msg: '数据获取成功',
          }
          return res.json(obj)
        }
      })
    })
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
  getOne(req, res, next) {
    return true
  },

  /**
   * 删除一篇文章
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  deleteOne(req, res, next) {
    // // token验证不通过则跳转至登陆页
    // if (!req.user) {
    //   return res.redirect('/admin/login')
    // }
    let _id = validator.trim(req.params.id)
    if (!_id || _id.length === 0) {
      return res.status(400).send({
        success: false,
        msg: '无效卡片id'
      })
    }
    Post.remove({
      _id: _id
    }, function (err) {
      if (err) res.send({
        success: false,
        msg: err
      })
      res.json({
        success: true,
        msg: '删除成功'
      })
      next()
    })
  }
}