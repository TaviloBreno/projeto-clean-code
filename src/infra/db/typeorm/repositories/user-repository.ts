import type { FindOptionsWhere } from 'typeorm'
import { User } from '@/infra/db/typeorm/entities/user'
import { BaseRepository } from './base-repository'
import { DbTransaction } from '@/infra/db/typeorm/decorators/db-transaction'

interface AddUserParams {
  name: string
  email: string
  facebookId?: string | undefined
}

export class PgUserRepository extends BaseRepository<User> {
  constructor () {
    super(User)
  }

  @DbTransaction
  async add (userData: AddUserParams): Promise<User> {
    const userRepository = this.getRepository()
    const user = userRepository.create({
      name: userData.name,
      email: userData.email,
      ...(userData.facebookId ? { facebookId: userData.facebookId } : {})
    })
    const savedUser = await userRepository.save(user)
    return savedUser
  }

  async findByEmail (email: string): Promise<User | null> {
    const userRepository = this.getRepository()
    const whereClause: FindOptionsWhere<User> = { email }
    return await userRepository.findOne({ where: whereClause })
  }

  async findById (id: string): Promise<User | null> {
    const userRepository = this.getRepository()
    const whereClause: FindOptionsWhere<User> = { id }
    return await userRepository.findOne({ where: whereClause })
  }
}
