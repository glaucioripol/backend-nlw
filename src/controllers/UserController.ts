import { Request, Response } from 'express'

import { UserModel } from '../models/User'

class UserController {
  // aqui só deve entrar o dado necessario
  // usar repository
  public async index(req: Request, res: Response): Promise<Response<object>> {
    const users = (await UserModel.find()).map((item) => item.sanitize())
    return res.json(users)
  }

  public async store(req: Request, res: Response): Promise<Response<object>> {
    const user = (await UserModel.create(req.body)).sanitize()
    return res.json(user)
  }
}

const userController = new UserController()

export { userController as UserController }
