import { Router } from 'express'

import { pointsController } from './PointsControllers'
import { validateBodyToCreatePoints } from './JoiPoints'

function createRoutes(instanceRouter = pointsController()) {
  return Router()
    .get('/', instanceRouter.retrievePoints)
    .post('/', validateBodyToCreatePoints, instanceRouter.storePoints)
}
export function factoryPointsRoutes(): Router {
  return createRoutes()
}
