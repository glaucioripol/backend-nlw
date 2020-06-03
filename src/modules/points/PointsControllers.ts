import { Request, Response } from 'express'
import { Transaction } from 'knex'

import { connection } from '../../core/database'

import { factoryRepository } from '../../repository'
import { PointsRepository } from '../../repository/PointsRepository'
import { PointsItemRepository } from '../../repository/PointsItemRepository'

interface IItemsController {
  retrievePoints(req: Request, res: Response): void
  storePoints(req: Request, res: Response): void
}

export function pointsController(): IItemsController {
  const pointRepository = factoryRepository('points')

  return {
    retrievePoints(req: Request, res: Response): void {
      pointRepository
        .findAll()
        .then((data) => {
          // refatorar
          res.status(200).json({ data })
        })
        .catch(() => res.status(404).json({ error: 'try again' }))
    },

    async storePoints(req: Request, res: Response): Promise {
      try {
        const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body

        // esta bugando quando mando um id de item que não existe
        // verificar se é porque o pc tá bugando
        const transaction: Transaction = await connection.transaction() // se um derErrado , fala o resto

        const pointRepositoryTransaction = new PointsRepository(transaction)
        const [point_id] = await pointRepositoryTransaction.create({
          image: 'fake',
          name,
          email,
          whatsapp,
          latitude,
          longitude,
          city,
          uf,
        })

        const pointItems = items.map((fk_id_item: number) => ({ fk_id_point: point_id, fk_id_item }))

        const pointsItemRepositoryTransaction = new PointsItemRepository(transaction)
        const registerdPointItems = await pointsItemRepositoryTransaction.create(pointItems)

        return res.json({ point_id, registerdPointItems })
      } catch (error) {
        return res.status(404).json({ error })
      }
    },
  }
}
