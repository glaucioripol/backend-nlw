import { createConnection, Connection, QueryError, RowDataPacket } from 'mysql2'

type TypesDatabaseReturn = RowDataPacket | QueryError | undefined

interface InterfaceDatabaseReturn {
  data: TypesDatabaseReturn
  failed: boolean
}

class Database {
  private _connection: Connection | undefined

  public start(): void {
    this._connection = this.createConnection()
    console.log(`[${new Date().toLocaleString()}] - Running Database`)
  }

  public stop(): void {
    this._connection?.end()
    console.log(`[${new Date().toLocaleString()}] - Stoping Database`)
  }

  private createConnection(): Connection {
    const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env
    return createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
    })
  }

  private handleDatabaseAccess(data: TypesDatabaseReturn | any, failed?: boolean): InterfaceDatabaseReturn {
    return {
      data,
      failed: !!failed,
    }
  }

  public async executeQuery(query: string, parameters = []): Promise<InterfaceDatabaseReturn> {
    return new Promise((resolve, reject) => {
      this._connection?.query(query, parameters, (err: QueryError, rows: RowDataPacket[]) => {
        if (err) return reject(this.handleDatabaseAccess(err.sqlMessage, true))
        return resolve(this.handleDatabaseAccess(rows))
      })
    })
  }
}

export const database = new Database()
