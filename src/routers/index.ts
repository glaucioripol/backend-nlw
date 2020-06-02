import { Router } from 'express'

import { UserController } from '../controllers/UserController'

export const router = Router()

router.get('/users', UserController.index)
router.post('/users', UserController.store)
