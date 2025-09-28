import { setupChangeProfilePicture } from '@/data/services/change-profile-picture'
import { type ChangeProfilePicture } from '@/domain/use-cases/change-profile-picture'
import { makeAwsS3FileStorage } from '@/main/factories/infra/aws-s3-file-storage'
import { makePgUserProfileRepository } from '@/main/factories/repos/pg-user-profile'

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  return setupChangeProfilePicture(makeAwsS3FileStorage(), makePgUserProfileRepository())
}
