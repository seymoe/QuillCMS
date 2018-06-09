import { Router } from 'express'
import postCategory from './postCategory'

const router = Router()
router.use(postCategory)

export default router
