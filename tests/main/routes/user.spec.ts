import request from 'supertest'
import { app } from '@/main/config/app'

describe('User Routes', () => {
  describe('PUT /api/users/picture', () => {
    const url = '/api/users/picture'

    it('Should return 403 if no authorization header is provided', async () => {
      const { status, body } = await request(app)
        .put(url)
        .send()

      expect(status).toBe(403)
      expect(body.error).toBe('Access denied')
    })

    it('Should return 403 if invalid token is provided', async () => {
      const { status, body } = await request(app)
        .put(url)
        .set('authorization', 'Bearer invalid_token')
        .send()

      expect(status).toBe(403)
      expect(body.error).toBe('Access denied')
    })
  })
})
