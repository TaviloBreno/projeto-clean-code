import { DeletePictureController } from '@/application/controllers/delete-picture'
import { makeChangeProfilePicture } from '@/main/factories/use-cases/change-profile-picture'

export const makeDeletePictureController = (): DeletePictureController => {
  return new DeletePictureController(makeChangeProfilePicture())
}
