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

/* 获取淘客流媒体内容列表 */
router.get('/medias', function (req, res, next) {
  // 期望获取条数
  let qCount = parseInt(req.query.count)
  qCount = qCount > 0 ? qCount : 10
  
  // 调取接口获取数据
  client.execute('taobao.tbk.content.get', {
    'adzone_id': TBK.AdZoneId,
    'count': qCount
  }, (error, response) => {
    if (error) {
      res.json(error)
    } else {
      console.log('fuild media -> ', response)
      res.json(response)
    }
  })
})

export default router