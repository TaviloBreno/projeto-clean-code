import { type ChangeProfilePicture } from '@/domain/use-cases/change-profile-picture'
import { type UploadFile, type DeleteFile } from '@/data/contracts/apis/file-storage'
import { type SaveUserPicture, type LoadUserProfile } from '@/data/contracts/repos/user-profile'
import { UserProfile } from '@/domain/entities/user-profile'

type Setup = (
  fileStorage: UploadFile & DeleteFile,
  userProfileRepo: SaveUserPicture & LoadUserProfile
) => ChangeProfilePicture

export const setupChangeProfilePicture: Setup = (fileStorage, userProfileRepo) => ({
  perform: async (params: ChangeProfilePicture.Params): Promise<ChangeProfilePicture.Result> => {
    const { id, file } = params
    const data: { pictureUrl?: string, name?: string } = {}

    if (file !== undefined) {
      data.pictureUrl = await fileStorage.upload({
        file: file.buffer,
        fileName: `${id}.${file.mimeType.split('/')[1]}`
      }).then(result => result.url)
    } else {
      const userProfile = await userProfileRepo.load({ id })
      if (userProfile?.name) {
        data.name = userProfile.name
      }
    }

    const userProfileEntity = new UserProfile(id)
    userProfileEntity.setPicture(data)

    const { pictureUrl, initials } = userProfileEntity.picture
    await userProfileRepo.savePicture({
      id,
      ...(pictureUrl && { pictureUrl }),
      ...(initials && { initials })
    })

    return userProfileEntity.picture
  }
})
