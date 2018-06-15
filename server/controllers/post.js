import Post from '../models/Post'
import validator from 'validator'
import { log } from '../../utils/util'

let checkCreatePostFields = (formData) => {}

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
  createOne(req, res, next) {
    console.log(req)
    let editErr = false,
      desc = '',
      commentArr = []
  
    // 获取POST过来的字段数据
    const sentence = validator.trim(req.body.sentence || '') // 必需字段，文章标题
    const imgsrc = validator.trim(req.body.picture || '') // 非必需
    const category = validator.trim(req.body.category) // 非必需字段，默认值为 默认
    const style = validator.trim(req.body.style)
    const location = validator.trim(req.body.location)
    const author = validator.trim(req.body.author)
    const auth = validator.trim(req.body.auth || 'public') // 非必需字段，默认值为 public 
  
    // 校验数据是否符合要求
    if (sentence === '') {
      editErr = '要说话哦'
    } else if (sentence.length > 40) {
      editErr = '毋需多言，四十字足矣'
    }
  
    // 数据验证不通过则返回 400
    if (editErr) {
      return res.status(400).send({
        success: false,
        msg: editErr
      })
    }
  
    // 数据库存储并返回状态
    Post.create({
      sentence: sentence,
      picture: imgsrc,
      category: category,
      author: author,
      likes: 0,
      location: location,
      auth: auth,
      style: style,
      create_time: Date.now(),
      comments: commentArr
    }, function (err, posts) {
      if (err) return res.send({
        success: false,
        msg: err
      })
      return res.json({
        success: true,
        msg: '添加成功'
      })
    })
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