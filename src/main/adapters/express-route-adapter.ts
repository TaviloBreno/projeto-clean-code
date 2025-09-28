import { type Request, type Response } from 'express'
import { type Controller } from '../../application/controllers'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.data)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.data.message
      })
    }
  }
}
