import { checkUserSession } from '../../../utils/util'
import { Router } from 'express'
import CommentsController from '../../controllers/postComment'
const router = Router()

/* 评论 */
router.post('/comments/update', checkUserSession, CommentsController.updateOne)
router.get('/comments/list', checkUserSession, CommentsController.getCommens)
router.delete('/comments/:id', checkUserSession, CommentsController.deleteOne)

export default router