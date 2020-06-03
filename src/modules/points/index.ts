import { Router } from 'express'

import { pointsController } from './PointsControllers'
import { validateBodyToCreatePoints, validateQueryGetPoint, validateParamsGetPointById } from './JoiPoints'

function createRoutes(instanceRouter = pointsController()) {
  return Router()
    .get('/', validateQueryGetPoint, instanceRouter.retrievePoints)
    .get('/:id', validateParamsGetPointById, instanceRouter.show)
    .post('/', validateBodyToCreatePoints, instanceRouter.storePoints)
}
export function factoryPointsRoutes(): Router {
  return createRoutes()
}
