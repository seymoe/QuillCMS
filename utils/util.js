import shortid from 'shortid'
import siteConf from '../config/index.default'

export const log = siteConf.dev ? console.log.bind(console) : () => { }

// 校验合法ID
export const checkCurrentId = (ids) => {
  if (!ids) return false
  let idState = true
  let idsArr = ids.split(',')
  if (typeof idsArr === 'object' && idsArr.length > 0) {
    for (let i = 0; i < idsArr.length; i++) {
      if (!shortid.isValid(idsArr[i])) {
        idState = false
        break
      }
    }
  } else {
    idState = false
  }
  return idState
}

// 封装api返回的数据
export const renderApiData = (res, responseCode, responseMessage, data = {}) => {
  let sendData = {
    status: responseCode,
    success: true,
    message: responseMessage,
    request_time: (new Date()).getTime(),
    data
  }
  return sendData
}

// 封装api返回的错误数据
export const renderApiErr = (req, res, responseCode, responseMessage) => {
  if (typeof responseMessage === 'object') {
    responseMessage = responseMessage.message
  }
  let errorData = {
    status: responseCode,
    success: false,
    message: responseMessage,
    request_time: (new Date()).getTime(),
    data: {}
  }
  // 记录错误日志
  // logUtil.error(responseMessage, req)
  return errorData
}

// 数组转树形结构
export const arrayToTree = (arr) => {
  if (arr.length < 2) return arr

  let result = arr.filter((ele, index) => {
    return ele.parent_id === '0'
  })
  let subArr = arr.filter((ele, index) => {
    return ele.parent_id !== '0'
  })

  result.forEach(obj1 => {
    obj1.children = []
    subArr.forEach(obj2 => {
      if (obj2.parent_id === obj1._id) {
        obj1.children.push(obj2)
      }
    })
  })

  return result
}

// 返回客户端IP地址
export const getClientIp = (req) => {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || ''
}

// 接口中间件 判断是否是登陆状态
export const checkUserSession = (req, res, next) => {
  if (req.session.userLogined && req.session.userInfo.id) {
    next()
  } else {
    res.status(401).send(renderApiErr(req, res, 401, '用户未登陆，授权失败'))
  }
}
