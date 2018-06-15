import { checkUserSession } from '../../../utils/util'
import { Router } from 'express'
import PostTagController from '../../controllers/postTag'
const router = Router()

/* 添加标签 */
router.post('/tag/new', checkUserSession, PostTagController.createOne)
router.get('/tag/list', checkUserSession, PostTagController.getList)
router.delete('/tag/:id', checkUserSession, PostTagController.deleteOne)

export default router
