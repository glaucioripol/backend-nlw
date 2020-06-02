import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'

// import { router } from '../routers'

class App {
  private express: Application

  public constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(helmet())
    this.express.use(cors())
    this.express.use(compression())
  }

  private routes(): void {
    // this.express.use(router)
  }

  public start(): void {
    this.express.listen(process.env.SERVER_PORT, () => {
      console.log(`[${new Date().toLocaleString()}] - Running Api in ${process.env.SERVER_PORT}`)
    })
  }
}

export const Api = new App()
