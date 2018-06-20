import { Router } from 'express'
import postCategory from './postCategory'
import postTag from './postTag'
import post from './post'
import user from './user'
import system from './system'
import friendLink from './friendLink'

const router = Router()
router.use(postCategory)
router.use(user)
router.use(postTag)
router.use(post)
router.use(system)
router.use(friendLink)

export default router
