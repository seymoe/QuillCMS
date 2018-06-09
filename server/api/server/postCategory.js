import { Router } from 'express'
import PostCategoryController from '../../controllers/postCategory'
const router = Router()

/* 添加分类 */
router.post('/category/new', PostCategoryController.createOne)

export default router
