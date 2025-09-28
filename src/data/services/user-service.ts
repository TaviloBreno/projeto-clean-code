import { PgUserRepository } from '@/infra/db/typeorm/repositories/user-repository'
import { UserAccountRepository } from '@/infra/db/typeorm/repositories/user-account'
import { DbTransaction } from '@/infra/db/typeorm/decorators/db-transaction'

export interface CreateUserWithFacebookParams {
  name: string
  email: string
  facebookId?: string
}

export interface UpdateUserProfileParams {
  userId: string
  name?: string
  email?: string
  facebookId?: string
}

export class UserService {
  constructor (
    private readonly userRepository: PgUserRepository,
    private readonly userAccountRepository: UserAccountRepository
  ) {}

  @DbTransaction
  async createUserWithFacebook (params: CreateUserWithFacebookParams): Promise<{ id: string }> {
    // First check if user already exists with this email
    const existingUser = await this.userRepository.findByEmail(params.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Create user using the user repository (this will also use @DbTransaction)
    const user = await this.userRepository.add({
      name: params.name,
      email: params.email,
      facebookId: params.facebookId
    })

    // Update with Facebook account info using UserAccountRepository if facebookId provided
    if (params.facebookId) {
      await this.userAccountRepository.saveWithFacebook({
        id: user.id,
        name: params.name,
        email: params.email,
        facebookId: params.facebookId
      })
    }

    return { id: user.id }
  }

  async getUserProfile (userId: string): Promise<any> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    // Load additional account info
    const accountInfo = await this.userAccountRepository.load({ email: user.email })

    return {
      id: user.id,
      name: accountInfo?.name ?? user.name,
      email: user.email,
      facebookId: user.facebookId
    }
  }

  @DbTransaction
  async createMultipleUsers (userDataList: CreateUserWithFacebookParams[]): Promise<string[]> {
    const userIds: string[] = []

    // All users will be created in a single transaction
    for (const userData of userDataList) {
      // Check for duplicate emails in the list
      const emailCount = userDataList.filter(u => u.email === userData.email).length
      if (emailCount > 1) {
        throw new Error(`Duplicate email in request: ${userData.email}`)
      }

      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(userData.email)
      if (existingUser) {
        throw new Error(`User with email ${userData.email} already exists`)
      }

      // Create the user
      const user = await this.userRepository.add({
        name: userData.name,
        email: userData.email,
        facebookId: userData.facebookId
      })

      userIds.push(user.id)
    }

    return userIds
  }

  // Method that demonstrates nested transaction handling
  @DbTransaction
  async complexUserOperation (params: CreateUserWithFacebookParams): Promise<{ id: string, profileComplete: boolean }> {
    // This will create a transaction
    const userResult = await this.createUserWithFacebook(params)

    // Verify the operation completed successfully
    const finalUser = await this.getUserProfile(userResult.id)

    return {
      id: userResult.id,
      profileComplete: Boolean(finalUser.facebookId)
    }
  }

  // Static factory method
  static create (): UserService {
    const userRepository = new PgUserRepository()
    const userAccountRepository = new UserAccountRepository()

    return new UserService(userRepository, userAccountRepository)
  }
}
