import { type SaveUserPicture, type LoadUserProfile } from '@/data/contracts/repos/user-profile'

class MockUserProfileRepo implements SaveUserPicture, LoadUserProfile {
  async savePicture (params: SaveUserPicture.Params): Promise<SaveUserPicture.Result> {
    console.log('Saving user picture:', params)
    return undefined
  }

  async load (params: LoadUserProfile.Params): Promise<LoadUserProfile.Result> {
    console.log('Loading user profile:', params)
    return { name: 'John Doe' }
  }
}

export const makeUserProfileRepo = (): SaveUserPicture & LoadUserProfile => {
  return new MockUserProfileRepo()
}
