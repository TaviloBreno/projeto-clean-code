import { type DataSource } from 'typeorm'
import { UserAccountRepository } from '../../../../src/infra/db/typeorm/repositories/user-account'
import { createTestDatabase } from '../../../../src/infra/db/typeorm/helpers/database'

describe('UserAccountRepository', () => {
  let sut: UserAccountRepository
  let dataSource: DataSource

  beforeAll(async () => {
    dataSource = await createTestDatabase()
    sut = new UserAccountRepository(dataSource)
  })

  afterAll(async () => {
    await dataSource.destroy()
  })

  beforeEach(async () => {
    await dataSource.synchronize(true)
  })

  describe('load', () => {
    it('should return undefined if user does not exist', async () => {
      const result = await sut.load({ email: 'any_email' })

      expect(result).toBeUndefined()
    })

    it('should return user data if user exists', async () => {
      await dataSource.query(`
        INSERT INTO users (id, name, email) 
        VALUES ('any_id', 'any_name', 'any_email')
      `)

      const result = await sut.load({ email: 'any_email' })

      expect(result).toEqual({
        id: 'any_id',
        name: 'any_name'
      })
    })
  })

  describe('saveWithFacebook', () => {
    it('should create new user if id is undefined', async () => {
      const { id } = await sut.saveWithFacebook({
        id: undefined,
        name: 'any_name',
        email: 'any_email',
        facebookId: 'any_fb_id'
      })

      const users = await dataSource.query('SELECT * FROM users WHERE id = ?', [id])
      expect(users[0]).toMatchObject({
        id,
        name: 'any_name',
        email: 'any_email',
        facebook_id: 'any_fb_id'
      })
    })

    it('should update existing user if id is provided', async () => {
      await dataSource.query(`
        INSERT INTO users (id, name, email) 
        VALUES ('existing_id', 'old_name', 'any_email')
      `)

      const { id } = await sut.saveWithFacebook({
        id: 'existing_id',
        name: 'new_name',
        email: 'any_email',
        facebookId: 'any_fb_id'
      })

      expect(id).toBe('existing_id')
      const users = await dataSource.query('SELECT * FROM users WHERE id = ?', [id])
      expect(users[0]).toMatchObject({
        id: 'existing_id',
        name: 'new_name',
        email: 'any_email',
        facebook_id: 'any_fb_id'
      })
    })
  })
})
