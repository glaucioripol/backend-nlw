import { Router } from 'express'

import { factoryItemsRoutes } from '../modules/items'
import { factoryPointsRoutes } from '../modules/points'

export const router = Router()
  .use('/items', factoryItemsRoutes())
  .use('/points', factoryPointsRoutes())
