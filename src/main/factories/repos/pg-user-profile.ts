import { PgUserProfileRepository } from '@/infra/repos/postgres/user-profile-repository'
import { type SaveUserPicture, type LoadUserProfile } from '@/data/contracts/repos/user-profile'

export const makePgUserProfileRepository = (): SaveUserPicture & LoadUserProfile => {
  return new PgUserProfileRepository()
}
