import { Router } from 'express'

import { itemsController } from './ItemControllers'

function createRoutes(instanceRouter = itemsController()) {
  return Router().get('/', instanceRouter.retrieveItems)
}

export function factoryItemsRoutes(): Router {
  return createRoutes()
}
