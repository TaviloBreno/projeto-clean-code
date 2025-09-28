import request from 'supertest'
import { app } from '@/main/config/app'

describe('Login Routes', () => {
  describe('POST /api/auth/facebook', () => {
    it('Should return 400 if no token is provided', async () => {
      const response = await request(app)
        .post('/api/auth/facebook')
        .send({})

      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        error: 'token is required'
      })
    })

    it('Should return 500 for invalid token', async () => {
      const response = await request(app)
        .post('/api/auth/facebook')
        .send({ token: 'invalid_token' })

      expect(response.status).toBe(500)
      expect(response.body).toHaveProperty('error')
    })

    it('Should have the correct content-type', async () => {
      const response = await request(app)
        .post('/api/auth/facebook')
        .send({})

      expect(response.type).toBe('application/json')
    })
  })

  describe('GET /api-docs/', () => {
    it('Should return swagger documentation page', async () => {
      const response = await request(app)
        .get('/api-docs/')

      expect(response.status).toBe(200)
      expect(response.text).toContain('swagger-ui')
    })
  })

  describe('GET /swagger.json', () => {
    it('Should return swagger json specification', async () => {
      const response = await request(app)
        .get('/swagger.json')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('openapi')
      expect(response.body).toHaveProperty('info')
      expect(response.body).toHaveProperty('paths')
    })
  })
})
