import { Router } from 'express'

import { factoryItemsRoutes } from '../modules/items'

export const router = Router().use('/items', factoryItemsRoutes())
