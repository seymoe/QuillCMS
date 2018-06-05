import Coupon from '../models/Coupon'
import validator from 'validator'
import { Router } from 'express'
import { calcCoupon } from '../../plugins/utils'

const router = Router()

/* 获取淘宝客 好券清单 */
router.get('/goods', function (req, res, next) {
  // 处理请求参数
  // 搜索词
  let word = req.query.q
  if (word) {
    word = validator.escape(validator.trim(req.query.q))
  } else {
    word = ''
  }

  // 每页数据条数
  let pageSize = parseInt(req.query.pageSize)
  pageSize = (pageSize >= 1 || pageSize <= 100) ? pageSize : 20

  // 每页数据条数
  let page = parseInt(req.query.page)
  page = page > 1 ? page : '1'

  let conditions = {}

  // 如果有搜索词，则进行文本索引查询
  if (word === '女装') {
    conditions = { coupon_cate: 'ByB1ZXN-f' }
  } else if (word === '母婴') {
    conditions = { coupon_cate: 'r1UHJb7N-z' }
  }

  // 声明相关参数
  let totalCounts = 0   // 总条数
  let totalpages = 0    // 总页数
  let _data = []
  let msg = ''

  let option = { skip: (page - 1) * pageSize, limit: pageSize }

  let query = Coupon.find(conditions)

  query.sort({commission_rate: -1}).count((err, count) => {
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
          msg: '查询数据库出错！',
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
          msg: '数据获取成功！',
        }
        return res.json(obj)
      }
    })
  })
})

/* 通过id获取商品详情. */
// router.get('/coupons/:id', function (req, res, next) {
//   let id = parseInt(req.params.id)
//   if (!id && id !== 0) {
//     res.sendStatus(404)
//   } else {
//     // 通过ID查询商品详情
//     // 平台：1PC 2无线
//     let qPlatform = validator.trim(req.query.platform) === '1' ? '1' : '2'
//     client.execute('taobao.tbk.item.info.get', {
//       'num_iids': id,
//       'fields':'num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url',
//       'platform': qPlatform
//     }, (error, response) => {
//       if (error) {
//         res.json(error)
//       } else {
//         console.log('good info detail -> ', response)
//         res.json(response)
//       }
//     })
//   }
// })

// /* 通过信息生成淘口令 */
// router.post('/coupons/createpwd', function (req, res, next) {
//   // 淘宝用户ID
//   // let userId = req.body.userId
//   // 口令弹框内容
//   let qText = req.body.text && validator.trim(req.body.text)
//   // 口令跳转目标url
//   let qUrl = validator.isURL(validator.trim(req.body.url)) ? validator.trim(req.body.url) : ''
//   if (!qText || qUrl === '') {
//     // 参数错误
//     res.sendStatus(400)
//   } else {
//     // 调用接口生成淘口令
//     client.execute('taobao.tbk.tpwd.create', {
//       'text': qText,
//       'url': qUrl
//     }, (error, response) => {
//       if (error) {
//         res.json(error)
//       } else {
//         console.log('taokouling -> ', response)
//         res.json(response)
//       }
//     })
//   }

// })

export default router
