import { Router } from 'express'
import PostController from '../controllers/post'
const router = Router()

/* 卡片列表 */
router.get('/cards', PostController.getList)
router.get('/cards/:id', PostController.getOne)
router.post('/cards/new', PostController.createOne)
router.delete('/cards/:id', PostController.deleteOne)

export default router
