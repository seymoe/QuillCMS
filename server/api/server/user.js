import { checkUserSession } from '../../../utils/util'
import { Router } from 'express'
import UserController from '../../controllers/user'
const router = Router()

/* 用户列表 */
router.get('/user/list', checkUserSession, UserController.getUsers)
/* 添加用户 */
router.post('/user/new', checkUserSession, UserController.createUser)
/* 用户登陆 */
router.post('/user/login', UserController.loginAction)
/* 退出登陆 */
router.post('/user/logout', UserController.logoutAction)
/* 拉取用户信息 */
router.get('/user/:id', checkUserSession, UserController.getOne)
/* 删除用户 */
router.delete('/user/:id', checkUserSession, UserController.deleteOne)
/* 更新用户 */
router.post('/user/:id', checkUserSession, UserController.updateOne)

export default router
