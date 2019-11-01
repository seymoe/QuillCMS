import { Router } from 'express'
import { checkUserSession } from '../../../utils/util'
import PostController from '../../controllers/post'
import PostTagController from '../../controllers/postTag'
import UserController from '../../controllers/user'
import PostCategoryController from '../../controllers/postCategory'
import FriendLinkController from '../../controllers/friendLink'
import AdvertisementController from '../../controllers/advertisement'
import PostCommentController from '../../controllers/postComment'
import SystemController from '../../controllers/system'

const router = Router()

// router.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://www.kuajieyuan.com')
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With')
//   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, Content-Type, Authorization')
//   res.header('X-Powered-By', '3.2.1')
//   res.header('Access-Control-Allow-Credentials', 'true')
//   res.header('Content-Type', 'application/json;charset=utf-8')
//   next()
// })

/* 发现页文章列表 */
router.get('/explore/list', PostController.getExplorePost)

/* 顶部菜单 */
router.get('/category/list', PostCategoryController.getList)

// 上传图片
router.post('/upload', checkUserSession, SystemController.uploadImage)

/* 友情链接 */
router.get('/friendlinks', FriendLinkController.getList)

/* 广告 */
router.get('/ads', AdvertisementController.getList)
router.get('/ads/:id', AdvertisementController.getOne)

/* 文章相关 */
// 发布文章
router.post('/post/new', checkUserSession, PostController.createOne)
// 文章列表
router.get('/post/list', PostController.getList)
// 文章详情
router.get('/post/:id', PostController.getOne)
// 文章标签
router.get('/tag/list', PostTagController.getList)
// 用户喜欢文章
router.post('/post/like', checkUserSession, PostController.updateLikeNum)
// 用户收藏文章
router.post('/post/collect', checkUserSession, PostController.updateCollectNum)

/* 评论相关 */
// 评论列表
router.get('/comments', PostCommentController.getCommens)
router.post('/comments/new', checkUserSession, PostCommentController.postComment)

/* 用户相关 */
router.get('/member', UserController.getUsers)
router.get('/member/:id', UserController.memberGetBaseInfo)
router.post('/member/login', UserController.memberLoginAction)
router.post('/member/logout', checkUserSession, UserController.logoutAction)
router.post('/member/regist', UserController.memberRegistAction)
router.post('/member/avatar', checkUserSession, UserController.memberUpdateAvatar)
router.post('/member/profile', checkUserSession, UserController.memberUpdateProfile)

// 关注用户
router.post('/member/follow', checkUserSession, UserController.memberFollow)
// 取消关注用户
router.post('/member/unfollow', checkUserSession, UserController.memberUnFollow)

export default router
