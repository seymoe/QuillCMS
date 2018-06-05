import { Router } from 'express'

import couponAPI from './couponAPI'
import media from './media'

const router = Router()

// Add USERS Routes
router.use(couponAPI)
router.use(media)

export default router
