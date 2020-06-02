import { config } from 'dotenv'
import { Api } from './core/server'
// import { database } from './core/database'

async function bootstrap(): Promise<void> {
  config()

  try {
    // await database.start()
    await Api.start()
  } catch (error) {
    console.log(error)
    // await database.stop()
  }
}
bootstrap()
