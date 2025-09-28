import { type RequestHandler } from 'express'
import { type Controller } from '@/application/controllers/controller'

export const adaptRoute = (controller: Controller): RequestHandler => {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      file: req.file
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.data)
  }
}
