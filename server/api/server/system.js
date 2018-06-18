import { checkUserSession } from '../../../utils/util'
import { Router } from 'express'
import SystemController from '../../controllers/system'
const router = Router()

/* 添加标签 */
router.post('/upload', checkUserSession, SystemController.uploadImage)

export default router
