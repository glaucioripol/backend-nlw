import Knex from 'knex'

import { connection } from '../core/database'
import { IRepository, IRecord } from './types'

export interface IRecordItem {
  id: number
  image: string
  title: string
}

export class ItemRepository implements IRepository<IRecord> {
  private db: Knex
  private tableName: string

  public constructor(knexConnection = connection) {
    this.tableName = 'items'
    this.db = knexConnection
  }

  public findAll(): Promise<IRecordItem[]> {
    return this.db(this.tableName).select('*')
  }
}
