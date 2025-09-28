import type { Express } from 'express'
import { json, urlencoded } from 'express'
import cors from 'cors'

export const setupMiddlewares = (app: Express): void => {
  app.use(cors())
  app.use(json())
  app.use(urlencoded({ extended: true }))
}
