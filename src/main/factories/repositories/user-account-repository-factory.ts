import { UserAccountRepository } from '@/infra/db/typeorm/repositories'
import { makeDataSource } from '@/main/factories/db/data-source-factory'

export const makeUserAccountRepo = (): UserAccountRepository => {
  return new UserAccountRepository(makeDataSource())
}
