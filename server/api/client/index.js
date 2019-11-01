import { Router } from 'express'

import route from './route'

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

// Add USERS Routes
router.use(route)

export default router