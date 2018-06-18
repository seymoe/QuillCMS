import { Router } from 'express'
import PostController from '../../controllers/post'
import PostCategoryController from '../../controllers/postCategory'
const router = Router()

/* 顶部菜单 */
router.get('/category/list', PostCategoryController.getList)

/* 文章相关 */

// 文章列表
router.get('/post/list', PostController.getList)
// 文章详情
router.get('/post/:id', PostController.getOne)

router.post('/cards/new', PostController.createOne)
router.delete('/cards/:id', PostController.deleteOne)

export default router
