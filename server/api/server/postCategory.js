import { checkUserSession } from '../../../utils/util'
import { Router } from 'express'
import PostCategoryController from '../../controllers/postCategory'
const router = Router()

/* 添加分类 */
router.post('/category/new', checkUserSession, PostCategoryController.createOne)
router.get('/category/list', checkUserSession, PostCategoryController.getList)
router.delete('/category/:id', checkUserSession, PostCategoryController.deleteOne)

export default router
