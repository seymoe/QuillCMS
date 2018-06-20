import { checkUserSession } from '../../../utils/util'
import { Router } from 'express'
import PostController from '../../controllers/post'
const router = Router()

/* 添加标签 */
router.post('/post/new', checkUserSession, PostController.createOne)
router.post('/post/update', checkUserSession, PostController.updateOne)
router.get('/post/list', checkUserSession, PostController.getList)
router.get('/post/:id', checkUserSession, PostController.getOne)
router.delete('/post/:id', checkUserSession, PostController.deleteOne)

export default router
