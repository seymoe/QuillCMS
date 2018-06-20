import { checkUserSession } from '../../../utils/util'
import { Router } from 'express'
import FriendLinkController from '../../controllers/friendLink'
const router = Router()

/* 添加友情链接 */
router.post('/link/new', checkUserSession, FriendLinkController.createOne)
router.post('/link/update', checkUserSession, FriendLinkController.updateOne)
router.get('/link/list', checkUserSession, FriendLinkController.getList)
router.delete('/link/:id', checkUserSession, FriendLinkController.deleteOne)
router.get('/link/:id', checkUserSession, FriendLinkController.getOne)

export default router
