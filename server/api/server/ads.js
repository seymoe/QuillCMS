import { checkUserSession } from '../../../utils/util'
import { Router } from 'express'
import AdsController from '../../controllers/advertisement'
const router = Router()

/* 添加广告 */
router.post('/ads/new', checkUserSession, AdsController.createOne)
router.post('/ads/update', checkUserSession, AdsController.updateOne)
router.get('/ads/list', checkUserSession, AdsController.getList)
router.delete('/ads/:id', checkUserSession, AdsController.deleteOne)
router.get('/ads/:id', checkUserSession, AdsController.getOne)

export default router
