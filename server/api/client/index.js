import { Router } from 'express'

import route from './route'

const router = Router()

// Add USERS Routes
router.use(route)

export default router