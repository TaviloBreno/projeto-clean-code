import { SavePictureController } from '@/application/controllers/save-picture'
import { makeChangeProfilePicture } from '@/main/factories/use-cases/change-profile-picture'

export const makeSavePictureController = (): SavePictureController => {
  return new SavePictureController(makeChangeProfilePicture())
}
