import { Router } from 'express'
import { checkUserSession } from '../../../utils/util'
import PostController from '../../controllers/post'
import UserController from '../../controllers/user'
import PostCategoryController from '../../controllers/postCategory'
import FriendLinkController from '../../controllers/friendLink'
import AdvertisementController from '../../controllers/advertisement'
import PostComment from '../../controllers/postComment'

const router = Router()

/* 顶部菜单 */
router.get('/category/list', PostCategoryController.getList)

/* 友情链接 */
router.get('/friendlinks', FriendLinkController.getList)

/* 广告 */
router.get('/ads', AdvertisementController.getList)

/* 文章相关 */

// 文章列表
router.get('/post/list', PostController.getList)
// 文章详情
router.get('/post/:id', PostController.getOne)

/* 评论相关 */
// 评论列表
router.get('/comments', PostComment.getCommens)
router.post('/comments/new', checkUserSession, PostComment.postComment)

/* 用户相关 */
router.get('/member/:id', UserController.memberGetBaseInfo)
router.post('/member/login', UserController.memberLoginAction)
router.post('/member/logout', UserController.logoutAction)
router.post('/member/regist', UserController.memberRegistAction)

export default router
