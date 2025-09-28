import { TransactionManager } from '@/infra/db/typeorm/helpers/transaction-manager'
import { ConnectionManager } from '@/infra/db/typeorm/helpers/connection-manager'
import { PgUserRepository } from '@/infra/db/typeorm/repositories/user-repository'
import { UserAccountRepository } from '@/infra/db/typeorm/repositories/user-account'

describe('Database Transaction Integration Tests', () => {
  let connectionManager: ConnectionManager
  let transactionManager: TransactionManager
  let userRepository: PgUserRepository
  let userAccountRepository: UserAccountRepository

  beforeAll(async () => {
    connectionManager = ConnectionManager.getInstance()
    transactionManager = TransactionManager.getInstance()
    await connectionManager.connect()

    userRepository = new PgUserRepository()
    userAccountRepository = new UserAccountRepository()
  })

  afterAll(async () => {
    await connectionManager.disconnect()
  })

  beforeEach(async () => {
    // Clear all users before each test
    const dataSource = connectionManager.getDataSource()
    if (dataSource) {
      const repository = dataSource.getRepository('User')
      await repository.clear()
    }
  })

  describe('Transaction Management', () => {
    test('should execute multiple operations in a single transaction', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com'
      }

      const result = await transactionManager.executeInTransaction(async () => {
        const user = await userRepository.add(userData)

        // Simulate updating the user in the same transaction
        await transactionManager.executeInTransaction(async () => {
          const dataSource = connectionManager.getDataSource()
          if (dataSource) {
            const repository = dataSource.getRepository('User')
            await repository.update(user.id, { name: 'Updated User' })
          }
        })

        return user
      })

      expect(result.id).toBeDefined()

      // Verify the user was saved with updated name
      const savedUser = await userRepository.findById(result.id)
      expect(savedUser?.name).toBe('Updated User')
    })

    test('should rollback transaction on error', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com'
      }

      await expect(
        transactionManager.executeInTransaction(async () => {
          await userRepository.add(userData)

          // Simulate an error that should trigger rollback
          throw new Error('Simulated error')
        })
      ).rejects.toThrow('Simulated error')

      // Verify the user was not saved due to rollback
      const user = await userRepository.findByEmail(userData.email)
      expect(user).toBeNull()
    })

    test('should handle nested transactions correctly', async () => {
      const userData1 = {
        name: 'User 1',
        email: 'user1@example.com'
      }

      const userData2 = {
        name: 'User 2',
        email: 'user2@example.com'
      }

      const result = await transactionManager.executeInTransaction(async () => {
        const user1 = await userRepository.add(userData1)

        // Nested transaction (should reuse existing transaction)
        const user2 = await transactionManager.executeInTransaction(async () => {
          return await userRepository.add(userData2)
        })

        return { user1, user2 }
      })

      expect(result.user1.id).toBeDefined()
      expect(result.user2.id).toBeDefined()

      // Verify both users were saved
      const savedUser1 = await userRepository.findById(result.user1.id)
      const savedUser2 = await userRepository.findById(result.user2.id)

      expect(savedUser1?.name).toBe('User 1')
      expect(savedUser2?.name).toBe('User 2')
    })

    test('should handle decorator-based transactions', async () => {
      const userData = {
        name: 'Decorator User',
        email: 'decorator@example.com'
      }

      // The @DbTransaction decorator should automatically handle the transaction
      const user = await userRepository.add(userData)

      expect(user.id).toBeDefined()
      expect(user.name).toBe('Decorator User')

      // Verify the user was saved
      const savedUser = await userRepository.findById(user.id)
      expect(savedUser?.email).toBe('decorator@example.com')
    })

    test('should handle UserAccountRepository with Facebook data', async () => {
      const facebookData = {
        id: undefined,
        name: 'Facebook User',
        email: 'facebook@example.com',
        facebookId: 'fb_123456'
      }

      // This should use transaction via the decorator
      const result = await userAccountRepository.saveWithFacebook(facebookData)

      expect(result.id).toBeDefined()

      // Load the user to verify the save
      const loadResult = await userAccountRepository.load({ email: facebookData.email })
      expect(loadResult?.name).toBe('Facebook User')
      expect(loadResult?.id).toBe(result.id)
    })

    test('should handle concurrent transactions correctly', async () => {
      const userData1 = {
        name: 'Concurrent User 1',
        email: 'concurrent1@example.com'
      }

      const userData2 = {
        name: 'Concurrent User 2',
        email: 'concurrent2@example.com'
      }

      // Execute two transactions concurrently
      const [result1, result2] = await Promise.all([
        userRepository.add(userData1),
        userRepository.add(userData2)
      ])

      expect(result1.id).toBeDefined()
      expect(result2.id).toBeDefined()
      expect(result1.id).not.toBe(result2.id)

      // Verify both users were saved
      const savedUser1 = await userRepository.findById(result1.id)
      const savedUser2 = await userRepository.findById(result2.id)

      expect(savedUser1?.name).toBe('Concurrent User 1')
      expect(savedUser2?.name).toBe('Concurrent User 2')
    })
  })

  describe('Connection Management', () => {
    test('should reuse existing connection', () => {
      const manager1 = ConnectionManager.getInstance()
      const manager2 = ConnectionManager.getInstance()

      expect(manager1).toBe(manager2)
      expect(connectionManager.getDataSource()).toBeDefined()
    })

    test('should create query runners correctly', async () => {
      const queryRunner = await connectionManager.createQueryRunner()

      expect(queryRunner).toBeDefined()

      await queryRunner.release()
    })
  })
})
