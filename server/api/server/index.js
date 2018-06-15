import { Router } from 'express'
import postCategory from './postCategory'
import postTag from './postTag'
import user from './user'

const router = Router()
router.use(postCategory)
router.use(user)
router.use(postTag)

export default router
