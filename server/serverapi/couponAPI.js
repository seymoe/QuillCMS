import moment from 'moment'
import CouponCategory from '../models/CouponCategory'
import Coupon from '../models/Coupon'
import validator from 'validator'
import { Router } from 'express'
import { ApiClient } from '../utils/tbk'
import TBK from '../config'

const router = Router()
const client = new ApiClient({
  'appkey': TBK.Appkey,
  'appsecret': TBK.AppSecret,
  'REST_URL': TBK.RestUrl
})

/* 创建栏目分类 */
router.get('/coupons/createcate', function (req, res, next) {
  let cates = ['女装', '百货', '美食', '美妆', '鞋包', '内衣', '男装', '母婴', '数码', '饰品', '成人', '九块九','20元封顶','特价精选']
  cates.forEach(item => {
    CouponCategory.create({
      cate_name: item,
      parent_id: '',
      select_library: []
    }, (err) => {
      if (err) {
        console.log('创建失败 ', err)
      } else {
        console.log('创建成功')
      }
    })
  })
  return res.json({
    success: true,
    msg: '创建成功'
  })
})

/* 获取淘宝客 好券清单 */
// router.get('/coupons/pull', function (req, res, next) {
//   // 处理请求参数
//   // 每页数据条数
//   let qPageSize = parseInt(req.query.pageSize)
//   qPageSize = (qPageSize >= 1 || qPageSize <= 100) ? qPageSize : '100'

//   // 第几页
//   let qPageNo = parseInt(req.query.pageNum)
//   qPageNo = (qPageNo >= 1 || qPageNo <= 100) ? qPageNo : '1'

//   client.execute('taobao.tbk.dg.item.coupon.get', {
//     'adzone_id': TBK.AdZoneId,
//     'page_size': qPageSize,
//     'page_no': qPageNo
//   }, (error, response) => {
//     console.log(error)
//     if (error) {
//       return res.json({
//         success: false,
//         msg: error.msg
//       })
//     } else {
//       let list = response.results.tbk_coupon
//       console.log('coupon list -> ', list.length)
//       if (list.length <= 0) {
//         return res.json({
//           success: true,
//           data: [],
//           msg: '没有更多的数据可采集了！'
//         })
//       } else {
//         // 循环查找数据库，不存在则创建，存在则替换掉
//         list.forEach(function (coupon) {
//           Coupon.findOne({ num_iid: coupon.num_iid }, (err, doc) => {
//             if (!doc || err) {
//               console.log('没有找到ID为 ' + coupon.num_iid + ' 的商品，将进行创建并存储')
//               Coupon.create(coupon, (err, coupons) => {
//                 if (err) {
//                   console.log('创建失败 ', err)
//                 } else {
//                   console.log('创建成功')
//                 }
//               })
//             } else {
//               // 找到商品doc，更新数据
//               for (let key in coupon) {
//                 doc[key] = coupon[key]
//               }
//               doc.save(err => {
//                 if (err) {
//                   console.log('更新失败 ', err)
//                 } else {
//                   console.log('更新成功')
//                 }
//               })
//             }
//           })
//         }, this)

//         // 查询数据库数量，并返回
//         Coupon.find({}).count((err, count) => {
//           if (err) {
//             console.log('查询数据库失败！')
//             return res.json({
//               success: false,
//               msg: '查询数据库失败！'
//             })
//           } else {
//             console.log('数据更新成功，共' + count + '件商品')
//             return res.json({
//               success: true,
//               msg: '数据更新成功，共' + count + '件商品'
//             })
//           }
//         })
//       }
//     }
//   })
// })

// 清除数据库中优惠券过期的数据
// router.get('/coupons/clear', function (req, res, next) {
//   let now = Date.now()
//   console.log(now)
//   console.log('--- 开始查询并清除 ---')
//   Coupon.find({}, (err, docs) => {
//     if (err) {
//       console.log('查询数据库失败')
//       return res.json({
//         success: false,
//         msg: '查询数据库失败'
//       })
//     } else {
//       console.log('共查询到' + docs.length + '条数据！')
//       docs.forEach(item => {
//         let endTime = Date.parse(new Date(item.coupon_end_time))
//         if (now - endTime > 0) {
//           console.log('失效商品ID为：', item._id)
//           Coupon.remove({ _id: item._id }, (err) => {
//             if (err) {
//               console.log('删除失败！')
//             } else {
//               console.log('删除成功！')
//             }
//           })
//         }
//       })
//     }
//   })
// })

/* 通过信息生成淘口令 */
router.post('/coupons/createpwd', function (req, res, next) {
  // 淘宝用户ID
  // let userId = req.body.userId
  // 口令弹框内容
  let qText = req.body.text && validator.trim(req.body.text)
  // 口令跳转目标url
  let qUrl = validator.isURL(validator.trim(req.body.url)) ? validator.trim(req.body.url) : ''
  if (!qText || qUrl === '') {
    // 参数错误
    res.sendStatus(400)
  } else {
    // 调用接口生成淘口令
    client.execute('taobao.tbk.tpwd.create', {
      'text': qText,
      'url': qUrl
    }, (error, response) => {
      if (error) {
        res.json(error)
      } else {
        console.log('tao_pwd -> ', response)
        res.json(response)
      }
    })
  }

})

/* 拉取选品库列表 */
router.get('/coupons/selectlib', function (request, response, next) {
  client.execute('taobao.tbk.uatm.favorites.get', {
    'fields': 'favorites_title,favorites_id,type',
    'page_size': 100
  }, (err, res) => {
    if (err) {
      return response.json({
        success: false,
        msg: err.msg
      })
    } else {
      let results = res.results.tbk_favorites
      console.log('选品库列表 -> ', results)
      if (results.length > 0) {
        CouponCategory.find({ parent_id: '' }, (err, cates) => {
          if (cates.length < 1) return
          cates.forEach(cate => {
            results.forEach((item) => {
              if (item.favorites_title.indexOf(cate.cate_name) !== -1) {
                console.log('栏目：', cate)
                console.log('库:', item)
                CouponCategory.findOne({ cate_name: cate.cate_name }, (err, doc) => {
                  if (err || !doc) {
                    console.log('未查找到该分类，即将进行创建')
                    CouponCategory.create({
                      cate_name: '女装',
                      parent_id: '',
                      select_library: []
                    }, (err) => {
                      if (err) {
                        console.log('创建失败 ', err)
                      } else {
                        console.log('创建成功')
                      }
                    })
                  } else {
                    let selectlist = doc.select_library
                    let exist = false
                    if (selectlist.length > 0) {
                      selectlist.forEach(obj => {
                        if (obj.favorites_id === item.favorites_id) {
                          exist = true
                        }
                      })
                    }
                    // 如果这一项没有存在数据库，则存储
                    if (!exist) {
                      doc.select_library.push(item)
                      doc.save(err => {
                        if (err) {
                          console.log(err)
                        } else {
                          console.log('创建成功')
                        }
                      })
                    }
                  }
                })
              }
            })
          })
        })
      }
    }
  })
})

/* 拉取选品库商品 */
router.get('/coupons/selectlib/items', function (req, res, next) {
  CouponCategory.find({parent_id: ''}, (err, docs) => {
    if (err) {
      console.log('获取选品库失败，请更新选品库')
      return res.json({
        success: false,
        msg: '获取选品库失败，请更新选品库'
      })
    } else {
      if (docs.length < 1) {
        return res.json({
          success: false,
          msg: '选品库为空，请更新选品库'
        })
      } else {
        let _fetchData = (libid, cateid, pageNo, isContinue) => {
          client.execute('taobao.tbk.uatm.favorites.item.get', {
            'adzone_id': TBK.AdZoneId,
            'favorites_id': libid,
            'fields': 'num_iid,title,item_description,pict_url,item_url,small_images,shop_title,user_type,nick,seller_id,provcity,reserve_price,zk_final_price,volume,coupon_total_count,coupon_remain_count,commission_rate,coupon_info,category,coupon_start_time,coupon_end_time,click_url,tk_rate,zk_final_price_wap,event_start_time,event_end_time,status,coupon_click_url',
            'page_size': 100,
            'page_no': pageNo
          }, (error, response) => {
            if (error) {
              return res.json({
                success: false,
                msg: error.msg
              })
            } else {
              console.log('response ->', response)
              let results = response.results.uatm_tbk_item
              let totoal = response.results.total_results

              // 将数据存储到数据库
              results.forEach(item => {
                Coupon.findOne({ num_iid: item.num_iid }, (err, doc) => {
                  if (err || !doc) {

                    console.log('未找到商品，将进行创建')

                    // 设定选品库ID
                    item.coupon_cate = cateid
                    Coupon.create(item, (err) => {
                      if (err) {
                        console.log('创建失败 ', err)
                      } else {
                        console.log('创建成功')
                      }
                    })
                  } else {
                    // 找到商品doc，更新数据
                    for (let key in item) {
                      doc[key] = item[key]
                    }
                    doc.save(err => {
                      if (err) {
                        console.log('更新失败 ', err)
                      } else {
                        console.log('更新成功')
                      }
                    })
                  }
                })
              })

              if (totoal > results.length && isContinue) {
                _fetchData(libid, cateid, 2, false)
              }
            }
          })
        }
        // 循环选品库列表，拉取相应数据
        docs.forEach(item => {
          item.select_library.forEach(obj => {
            if (obj.favorites_title.indexOf('女装') < 0 || obj.favorites_title.indexOf('母婴') < 0) return
            _fetchData(obj.favorites_id, item._id, 1, true)
          })
        })
      }
    }
  })
})

export default router
