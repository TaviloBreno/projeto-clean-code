import { UserAccountRepository } from '../../../../src/infra/db/typeorm/repositories/user-account'
import { ConnectionManager } from '../../../../src/infra/db/typeorm/helpers/connection-manager'

describe('UserAccountRepository', () => {
  let sut: UserAccountRepository
  let connectionManager: ConnectionManager

  beforeAll(async () => {
    connectionManager = ConnectionManager.getInstance()
    await connectionManager.connect()
    sut = new UserAccountRepository()
  })

  afterAll(async () => {
    await connectionManager.disconnect()
  })

  beforeEach(async () => {
    const dataSource = connectionManager.getDataSource()
    if (dataSource) {
      await dataSource.synchronize(true)
    }
  })

  describe('load', () => {
    it('should return undefined if user does not exist', async () => {
      const result = await sut.load({ email: 'any_email' })

      expect(result).toBeUndefined()
    })

    it('should return user data if user exists', async () => {
      const dataSource = connectionManager.getDataSource()
      if (dataSource) {
        await dataSource.query(`
          INSERT INTO users (id, name, email) 
          VALUES ('any_id', 'any_name', 'any_email')
        `)
      }

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

      const dataSource = connectionManager.getDataSource()
      if (dataSource) {
        const users = await dataSource.query('SELECT * FROM users WHERE id = ?', [id])
        expect(users[0]).toMatchObject({
          id,
          name: 'any_name',
          email: 'any_email',
          facebook_id: 'any_fb_id'
        })
      }
    })

    it('should update existing user if id is provided', async () => {
      const dataSource = connectionManager.getDataSource()
      if (dataSource) {
        await dataSource.query(`
          INSERT INTO users (id, name, email) 
          VALUES ('existing_id', 'old_name', 'any_email')
        `)
      }

      const { id } = await sut.saveWithFacebook({
        id: 'existing_id',
        name: 'new_name',
        email: 'any_email',
        facebookId: 'any_fb_id'
      })

      expect(id).toBe('existing_id')
      const dataSource2 = connectionManager.getDataSource()
      if (dataSource2) {
        const users = await dataSource2.query('SELECT * FROM users WHERE id = ?', [id])
        expect(users[0]).toMatchObject({
          id: 'existing_id',
          name: 'new_name',
          email: 'any_email',
          facebook_id: 'any_fb_id'
        })
      }
    })
  })
})
