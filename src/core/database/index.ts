import knex from 'knex'
import path from 'path'

export const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true, // para o sqlite, ele não aceita  valores defaulti
})
