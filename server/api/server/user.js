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
/* 删除用户 */
router.delete('/user/:id', checkUserSession, UserController.deleteOne)

export default router
