import { Request, Response } from 'express'

import { factoryRepository } from '../../repository'

export interface IItemsController {
  retrieveItems(req: Request, res: Response): void
}

export function itemsController(): IItemsController {
  const itemRepository = factoryRepository('items')

  return {
    retrieveItems(req: Request, res: Response): void {
      itemRepository.findAll().then((data) => res.json(data))
    },
  }
}
