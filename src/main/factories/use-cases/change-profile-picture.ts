import { setupChangeProfilePicture } from '@/data/services/change-profile-picture'
import { type ChangeProfilePicture } from '@/domain/use-cases/change-profile-picture'
import { makeAwsS3FileStorage } from '@/main/factories/infra/aws-s3-file-storage'
import { makeUserProfileRepo } from '@/main/factories/repos/user-profile'

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  return setupChangeProfilePicture(makeAwsS3FileStorage(), makeUserProfileRepo())
}
