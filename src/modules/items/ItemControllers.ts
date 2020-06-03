import { Request, Response } from 'express'

import { factoryRepository } from '../../repository'

interface IItemsController {
  retrieveItems(req: Request, res: Response): void
}

export function itemsController(): IItemsController {
  const itemRepository = factoryRepository('items')

  return {
    retrieveItems(req: Request, res: Response): void {
      itemRepository
        .findAll()
        .then((data) => {
          // refatorar
          const serializedItems = data.map(({ id, title, image }) => ({ id, title, image_url: `http://localhost:${process.env.SERVER_PORT}/uploads/${image}` }))
          res.status(200).json({ data: serializedItems })
        })
        .catch(() => res.status(404).json({ error: 'try' }))
    },
  }
}
