import Knex, { Transaction } from 'knex'

import { connection } from '../core/database'
import { IRepository } from './types'

export interface IRecordPointItem {
  id: number
  fk_id_point: number
  fk_id_item: number
}

export class PointsItemRepository implements IRepository<IRecordPointItem> {
  private db: Knex | Transaction
  private tableName: string

  constructor(knexConnection = connection) {
    this.tableName = 'point_items'
    this.db = knexConnection
  }

  findAll(): Promise<IRecordPointItem[]> {
    return this.db(this.tableName).select('*')
  }

  create(input: IRecordPointItem): Promise<IRecordPointItem[]> {
    return this.db(this.tableName).insert(input)
  }
}
