import { Request, Response } from 'express'
import { Transaction } from 'knex'

import { connection } from '../../core/database'

import { factoryRepository } from '../../repository'
import { PointsRepository } from '../../repository/PointsRepository'
import { PointsItemRepository } from '../../repository/PointsItemRepository'
import { ItemRepository } from '../../repository/ItemsRepository'

interface IItemsController {
  retrievePoints(req: Request, res: Response): void
  show(req: Request, res: Response): void
  storePoints(req: Request, res: Response): void
}

export function pointsController(): IItemsController {
  const pointRepository = factoryRepository('points')

  return {
    retrievePoints(req: Request, res: Response) {
      pointRepository
        .findAll()
        .then((data) => {
          // refatorar
          res.status(200).json({ data })
        })
        .catch(() => res.status(400).json({ error: 'try again' }))
    },

    async show(req: Request, res: Response) {
      try {
        const { id } = req.params
        const consultedPoint = await pointRepository.find(id).first()
        if (!consultedPoint) {
          return res.status(400).json({ message: 'Point Not Found' })
        }
        const itemRepository = new ItemRepository()

        const items = await itemRepository
          .db('items')
          .join('point_items', 'items.id', '=', 'point_items.fk_id_item')
          .where('point_items.fk_id_point', id)
          .select('items.title')

        return res.json({ ...consultedPoint, items })
      } catch (err) {
        return res.status(400).json({ err })
      }
    },

    async storePoints(req: Request, res: Response) {
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
        return res.status(400).json({ error })
      }
    },
  }
}
