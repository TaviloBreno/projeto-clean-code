import type { Express } from 'express'
import { Router } from 'express'
import { readdirSync } from 'fs'
import { resolve } from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  const routesPath = resolve(__dirname, '..', 'routes')
  readdirSync(routesPath).forEach(async fileName => {
    if (fileName.includes('.map') || fileName.includes('.test.') || fileName.includes('.spec.')) {
      return
    }

    (await import(`../routes/${fileName}`)).default(router)
  })
}
