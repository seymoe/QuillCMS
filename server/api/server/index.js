import { Router } from 'express'
import postCategory from './postCategory'
import user from './user'

const router = Router()
router.use(postCategory)
router.use(user)

export default router
