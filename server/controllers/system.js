import { log, renderApiData, renderApiErr } from '../../utils/util'
import multer from 'multer'

export default {
  async uploadImage(req, res, next) {
    try{
      let upload = multer({
        dest: 'uploads/',
        fileFilter: (req, files, callback) => {
          // 只允许上传jpg|png|jpeg|gif格式的文件
          var type = '|' + files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1) + '|'
          var fileTypeValid = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1
          callback(null, !!fileTypeValid)
        }
      })

      upload.single('image')(req, res, function (err) {
        if (err) {
          res.status(500).send(renderApiErr(req, res, 500, err))
        }

        if (req.file) {
          //获取源文件后缀名
          let fileFormat = (req.file.originalname).split(".")
          //设置上传到七牛云的文件命名
          let filePath = '/upload/article/' + req.file.fieldname + '-' +Date.now() + '.' +fileFormat[fileFormat.length - 1]
        }
      })
    } catch (err) {
      res.status(500).send(renderApiErr(req, res, 500, err))
    }
  }
}