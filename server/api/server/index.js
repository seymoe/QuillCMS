import { Router } from 'express'
import postCategory from './postCategory'
import postTag from './postTag'
import post from './post'
import user from './user'
import system from './system'
import friendLink from './friendLink'
import ads from './ads'
import postComment from './postComment'

const router = Router()
router.use(postCategory)
router.use(user)
router.use(postTag)
router.use(post)
router.use(system)
router.use(friendLink)
router.use(ads)
router.use(postComment)

export default router
