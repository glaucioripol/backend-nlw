import Knex from 'knex'

import { connection } from '../core/database'
import { IRepository, IRecord } from './types'

export interface IRecordPoint extends IRecord {
  id: number
  image: string
  name: string
  email: string
  whatsapp: string
  latitude: number
  longitude: number
  city: string
  uf: string
}

export class PointsRepository implements IRepository<IRecordPoint> {
  private db: Knex
  private tableName: string

  constructor(knexConnection = connection) {
    this.tableName = 'points'
    this.db = knexConnection
  }

  findAll(): Promise<IRecordPoint[]> {
    return this.db(this.tableName).select('*')
  }

  find(input: number): Promise<IRecordPoint[]> {
    return this.db(this.tableName).select('*').where('id', '=', input)
  }

  create(input: Omit<IRecordPoint, keyof IRecord>): Promise<IRecordPoint[]> {
    return this.db(this.tableName).insert(input)
  }
}
