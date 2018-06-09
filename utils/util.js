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
export const renderApiData = (res, responseCode, responseMessage, data = {}, type = "getlist") => {
  // if (type == 'getlist') {
  //   responseMessage = res.__("validate_error_getSuccess", { success: responseMessage })
  // }
  let sendData = {
    status: responseCode,
    message: responseMessage,
    server_time: (new Date()).getTime(),
    data
  }
  console.log(data)
  return sendData
}

export const renderApiErr = (req, res, responseCode, responseMessage, type = 'save') => {
  if (typeof responseMessage == 'object') {
    responseMessage = responseMessage.message
  }
  // if (type == 'save') {
  //   responseMessage = res.__("resdata_savedata_error", { error: responseMessage })
  // } else if (type == 'delete') {
  //   responseMessage = res.__("resdata_deldata_error", { error: responseMessage })
  // } else if (type == 'update') {
  //   responseMessage = res.__("resdata_updatedata_error", { error: responseMessage })
  // } else if (type == 'getlist') {
  //   responseMessage = res.__("resdata_getlist_error", { error: responseMessage })
  // } else if (type == 'checkform') {
  //   responseMessage = res.__("resdata_checkformdata_error", { error: responseMessage })
  // }
  let errorData = {
    status: responseCode,
    message: responseMessage,
    server_time: (new Date()).getTime(),
    data: {}
  }
  // 记录错误日志
  // logUtil.error(responseMessage, req)
  return errorData
}