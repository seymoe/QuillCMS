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

router.use(postCategory)
router.use(user)
router.use(postTag)
router.use(post)
router.use(system)
router.use(friendLink)
router.use(ads)
router.use(postComment)

export default router
