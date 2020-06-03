import { Router } from 'express'

import { itemsController } from './ItemControllers'

function createRoute(instanceRouter = itemsController()) {
  return Router().get('/', instanceRouter.retrieveItems)
}

export function factoryItemsRoutes(): Router {
  return createRoute()
}
