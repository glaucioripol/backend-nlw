import { Router } from 'express'

import { pointsController } from './PointsControllers'
import { validateBodyToCreatePoints, validateParamsGetPointById } from './JoiPoints'

function createRoutes(instanceRouter = pointsController()) {
  return Router()
    .get('/', instanceRouter.retrievePoints)
    .get('/:id', validateParamsGetPointById, instanceRouter.show)
    .post('/', validateBodyToCreatePoints, instanceRouter.storePoints)
}
export function factoryPointsRoutes(): Router {
  return createRoutes()
}
