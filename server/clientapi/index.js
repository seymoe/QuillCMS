import { Router } from 'express'

import post from './post'

const router = Router()

// Add USERS Routes
router.use(post)

export default router