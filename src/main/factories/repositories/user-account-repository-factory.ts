import { UserAccountRepository } from '@/infra/db/typeorm/repositories'

export const makeUserAccountRepo = (): UserAccountRepository => {
  return new UserAccountRepository()
}
