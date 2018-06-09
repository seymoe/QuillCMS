import shortid from 'shortid'
import siteConf from '../config/index.default'

export const log = siteConf.dev ? console.log.bind(console) : () => { }

// 校验合法ID
export const checkCurrentId = (ids) => {
  if (!ids) return false
  let idState = true
  let idsArr = ids.split(',')
  if (typeof idsArr === "object" && idsArr.length > 0) {
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

export const renderApiErr = (req, res, responseCode, responseMessage) => {
  if (typeof responseMessage == 'object') {
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