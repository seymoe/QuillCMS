import { log, renderApiData, renderApiErr } from '../../utils/util'
import conf from '../../config/index.default'
import multer from 'multer'
import qiniu from 'qiniu'

const uploadToQiniu = (req, res, imgkey, imgname) => {
  // 鉴权凭证
  let { openqn, accessKey, secretKey, bucket, computerRoom, origin, fsizeLimit } = conf
  if (!openqn) return false

  let config = new qiniu.conf.Config()
  // 空间对应的机房
  switch (computerRoom) {
    case '华东':
      config.zone = qiniu.zone.Zone_z0
      break
    case '华北':
      config.zone = qiniu.zone.Zone_z1
      break
    case '华南':
      config.zone = qiniu.zone.Zone_z2
      break
    case '北美':
      config.zone = qiniu.zone.Zone_na0
      break
  }
  
  // 是否使用https域名
  //config.useHttpsDomain = true
  // 上传是否使用cdn加速
  config.useCdnDomain = true

  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  let options = {
    scope: bucket,
    fsizeLimit: fsizeLimit,
    mimeLimit: 'image/*'
  }
  let putPolicy = new qiniu.rs.PutPolicy(options)
  let uploadToken = putPolicy.uploadToken(mac)

  let localFile = process.cwd() + '/' + imgkey
  let formUploader = new qiniu.form_up.FormUploader(config)
  let putExtra = new qiniu.form_up.PutExtra()

  // 文件上传
  formUploader.putFile(uploadToken, imgkey, localFile, putExtra, function (respErr,
    respBody, respInfo) {
    if (respErr) {
      throw respErr
    }
    if (respInfo.statusCode === 200) {
      log('qiniu-response->',respBody)
      res.send(renderApiData(res, 200, '图片上传成功', origin + '/' + respBody.key))
    } else {
      log(respInfo.statusCode)
      log(respBody)
      // 上传七牛云失败，返回服务器上的图片链接
      res.send(renderApiData(res, 200, '图片上传成功', `/upload/images/${imgname}`))
    }
  })
}

export default {
  async uploadImage(req, res, next) {
    try {
      let uploadName = req.query.name
      if (uploadName !== 'cover' && uploadName !== 'avatar') {
        res.status(500).send(renderApiErr(req, res, 500, '参数错误'))
      }

      let storage = multer.diskStorage(
        {
          destination: 'static/upload/images',
          fileFilter: (req, files, callback) => {
            // 只允许上传jpg|png|jpeg|gif格式的文件
            let type = '|' + files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1) + '|'
            let fileTypeValid = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1
            callback(null, !!fileTypeValid)
          },
          filename: (req, file, cb) => {
            let fileFormat = (file.originalname).split(".")
            cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1])
          }
        }
      )
      let upload = multer({storage: storage})

      upload.single(uploadName)(req, res, function (err) {
        if (err) {
          res.status(500).send(renderApiErr(req, res, 500, err))
        }

        if (req.file) {
          log(req.file)
          // 文件上传成功，如果开启了七牛云存储，则存储至七牛云
          if (conf.openqn) {
            //设置上传到七牛云的文件命名
            let filePath = req.file.path
            log(filePath)
            uploadToQiniu(req, res, filePath, req.file.filename)
          } else {
            // 未开启七牛云，返回服务器上的图片链接
            res.send(renderApiData(res, 200, '图片上传成功', `/upload/images/${req.file.filename}`))
          }
        }
      })
    } catch (err) {
      res.status(500).send(renderApiErr(req, res, 500, err))
    }
  }
}