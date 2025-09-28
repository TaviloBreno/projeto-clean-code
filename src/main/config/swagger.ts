import type { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import swaggerDocument from '@/main/docs'

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', serve, setup(swaggerDocument))
  app.get('/swagger.json', (_req, res) => {
    res.json(swaggerDocument)
  })
}
