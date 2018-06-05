import { Router } from 'express'

import post from './post'
// import media from './media'

const router = Router()

// Add USERS Routes
router.use(post)
// router.use(media)

export default router