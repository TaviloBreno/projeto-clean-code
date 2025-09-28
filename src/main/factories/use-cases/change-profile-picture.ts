import { setupChangeProfilePicture } from '@/data/services/change-profile-picture'
import { type ChangeProfilePicture } from '@/domain/use-cases/change-profile-picture'
import { makeFileStorage } from '@/main/factories/infra/file-storage'
import { makeUserProfileRepo } from '@/main/factories/repos/user-profile'

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  return setupChangeProfilePicture(makeFileStorage(), makeUserProfileRepo())
}
