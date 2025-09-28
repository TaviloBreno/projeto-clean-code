import { type RequestHandler } from 'express'
import { type Middleware } from '@/application/middlewares/middleware'

export const adaptMiddleware = (middleware: Middleware): RequestHandler => {
  return async (req, res, next) => {
    const httpRequest = {
      headers: req.headers as Record<string, string>
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req.body, httpResponse.data)
      next()
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.data.message })
    }
  }
}
