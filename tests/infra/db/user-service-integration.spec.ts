import { UserService } from '@/data/services/user-service'
import { ConnectionManager } from '@/infra/db/typeorm/helpers/connection-manager'

describe('UserService Integration Tests', () => {
  let userService: UserService
  let connectionManager: ConnectionManager

  beforeAll(async () => {
    connectionManager = ConnectionManager.getInstance()
    await connectionManager.connect()

    userService = UserService.create()
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

  describe('createUserWithFacebook', () => {
    test('should create user with Facebook data successfully', async () => {
      const userData = {
        name: 'Facebook User',
        email: 'facebook@example.com',
        facebookId: 'fb_123456'
      }

      const result = await userService.createUserWithFacebook(userData)

      expect(result.id).toBeDefined()
      expect(typeof result.id).toBe('string')

      // Verify the user was created
      const profile = await userService.getUserProfile(result.id)
      expect(profile.name).toBe('Facebook User')
      expect(profile.email).toBe('facebook@example.com')
      expect(profile.facebookId).toBe('fb_123456')
    })

    test('should create user without Facebook data', async () => {
      const userData = {
        name: 'Regular User',
        email: 'regular@example.com'
      }

      const result = await userService.createUserWithFacebook(userData)

      expect(result.id).toBeDefined()

      // Verify the user was created
      const profile = await userService.getUserProfile(result.id)
      expect(profile.name).toBe('Regular User')
      expect(profile.email).toBe('regular@example.com')
      expect(profile.facebookId).toBeUndefined()
    })

    test('should throw error when user with email already exists', async () => {
      const userData = {
        name: 'First User',
        email: 'duplicate@example.com',
        facebookId: 'fb_111'
      }

      // Create first user
      await userService.createUserWithFacebook(userData)

      // Try to create another user with same email
      const duplicateData = {
        name: 'Second User',
        email: 'duplicate@example.com',
        facebookId: 'fb_222'
      }

      await expect(
        userService.createUserWithFacebook(duplicateData)
      ).rejects.toThrow('User with this email already exists')
    })
  })

  describe('getUserProfile', () => {
    test('should return user profile correctly', async () => {
      const userData = {
        name: 'Profile User',
        email: 'profile@example.com',
        facebookId: 'fb_profile'
      }

      const result = await userService.createUserWithFacebook(userData)
      const profile = await userService.getUserProfile(result.id)

      expect(profile.id).toBe(result.id)
      expect(profile.name).toBe('Profile User')
      expect(profile.email).toBe('profile@example.com')
      expect(profile.facebookId).toBe('fb_profile')
    })

    test('should throw error when user not found', async () => {
      await expect(
        userService.getUserProfile('non-existent-id')
      ).rejects.toThrow('User not found')
    })
  })

  describe('createMultipleUsers', () => {
    test('should create multiple users in a single transaction', async () => {
      const userDataList = [
        {
          name: 'User 1',
          email: 'user1@example.com',
          facebookId: 'fb_1'
        },
        {
          name: 'User 2',
          email: 'user2@example.com',
          facebookId: 'fb_2'
        },
        {
          name: 'User 3',
          email: 'user3@example.com'
        }
      ]

      const userIds = await userService.createMultipleUsers(userDataList)

      expect(userIds).toHaveLength(3)
      expect(userIds.every(id => typeof id === 'string')).toBe(true)

      // Verify all users were created
      for (let i = 0; i < userIds.length; i++) {
        const userId = userIds[i]
        if (userId) {
          const profile = await userService.getUserProfile(userId)
          const userData = userDataList[i]
          if (profile && userData) {
            expect(profile.name).toBe(userData.name)
            expect(profile.email).toBe(userData.email)
          }
        }
      }
    })

    test('should rollback all users when one creation fails', async () => {
      // Create a user first
      await userService.createUserWithFacebook({
        name: 'Existing User',
        email: 'existing@example.com'
      })

      const userDataList = [
        {
          name: 'User 1',
          email: 'new1@example.com'
        },
        {
          name: 'User 2',
          email: 'existing@example.com' // This should cause a conflict
        },
        {
          name: 'User 3',
          email: 'new3@example.com'
        }
      ]

      await expect(
        userService.createMultipleUsers(userDataList)
      ).rejects.toThrow('User with email existing@example.com already exists')

      // Verify that none of the new users were created due to rollback
      const dataSource = connectionManager.getDataSource()
      if (dataSource) {
        const repository = dataSource.getRepository('User')
        const users = await repository.find()

        // Should only have the initially created user
        expect(users).toHaveLength(1)
        if (users[0]) {
          expect(users[0]['email']).toBe('existing@example.com')
        }
      }
    })

    test('should detect duplicate emails in the request', async () => {
      const userDataList = [
        {
          name: 'User 1',
          email: 'duplicate@example.com'
        },
        {
          name: 'User 2',
          email: 'duplicate@example.com' // Duplicate in the same request
        }
      ]

      await expect(
        userService.createMultipleUsers(userDataList)
      ).rejects.toThrow('Duplicate email in request: duplicate@example.com')
    })
  })

  describe('complexUserOperation', () => {
    test('should perform complex nested transaction operations', async () => {
      const userData = {
        name: 'Complex User',
        email: 'complex@example.com',
        facebookId: 'fb_complex'
      }

      const result = await userService.complexUserOperation(userData)

      expect(result.id).toBeDefined()
      expect(result.profileComplete).toBe(true)

      // Verify the user was created with Facebook data
      const profile = await userService.getUserProfile(result.id)
      expect(profile.facebookId).toBe('fb_complex')
    })

    test('should handle nested transaction rollback', async () => {
      // Create a user with duplicate email to force an error
      await userService.createUserWithFacebook({
        name: 'Existing User',
        email: 'duplicate@example.com'
      })

      const userData = {
        name: 'New User',
        email: 'duplicate@example.com', // This will cause conflict
        facebookId: 'fb_new'
      }

      await expect(
        userService.complexUserOperation(userData)
      ).rejects.toThrow('User with this email already exists')

      // Verify that no additional user was created
      const dataSource = connectionManager.getDataSource()
      if (dataSource) {
        const repository = dataSource.getRepository('User')
        const users = await repository.find()

        expect(users).toHaveLength(1)
        if (users[0]) {
          expect(users[0]['email']).toBe('duplicate@example.com')
        }
      }
    })
  })

  describe('Transaction Decorator Integration', () => {
    test('should handle concurrent operations correctly', async () => {
      const userData1 = {
        name: 'Concurrent User 1',
        email: 'concurrent1@example.com'
      }

      const userData2 = {
        name: 'Concurrent User 2',
        email: 'concurrent2@example.com'
      }

      // Execute operations concurrently
      const [result1, result2] = await Promise.all([
        userService.createUserWithFacebook(userData1),
        userService.createUserWithFacebook(userData2)
      ])

      expect(result1.id).toBeDefined()
      expect(result2.id).toBeDefined()
      expect(result1.id).not.toBe(result2.id)

      // Verify both users exist
      const profile1 = await userService.getUserProfile(result1.id)
      const profile2 = await userService.getUserProfile(result2.id)

      expect(profile1.name).toBe('Concurrent User 1')
      expect(profile2.name).toBe('Concurrent User 2')
    })
  })
})
