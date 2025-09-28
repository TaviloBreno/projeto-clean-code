import { type UploadFile, type DeleteFile } from '@/data/contracts/apis/file-storage'
import { type SaveUserPicture, type LoadUserProfile } from '@/data/contracts/repos/user-profile'
import { setupChangeProfilePicture } from '@/data/services/change-profile-picture'

describe('ChangeProfilePicture', () => {
  let file: Buffer
  let fileStorage: UploadFile & DeleteFile
  let userProfileRepo: SaveUserPicture & LoadUserProfile
  let sut: any

  beforeAll(() => {
    file = Buffer.from('any_buffer')
    fileStorage = {
      upload: jest.fn(),
      delete: jest.fn()
    }
    userProfileRepo = {
      savePicture: jest.fn(),
      load: jest.fn()
    }
    sut = setupChangeProfilePicture(fileStorage, userProfileRepo)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should call UploadFile with correct params', async () => {
    jest.mocked(fileStorage.upload).mockResolvedValueOnce({ url: 'any_url' })

    await sut.perform({ id: 'any_id', file: { buffer: file, mimeType: 'image/png' } })

    expect(fileStorage.upload).toHaveBeenCalledWith({
      file,
      fileName: 'any_id.png'
    })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })

  it('Should call SaveUserPicture with correct params', async () => {
    jest.mocked(fileStorage.upload).mockResolvedValueOnce({ url: 'any_url' })

    await sut.perform({ id: 'any_id', file: { buffer: file, mimeType: 'image/png' } })

    expect(userProfileRepo.savePicture).toHaveBeenCalledWith({
      id: 'any_id',
      pictureUrl: 'any_url'
    })
    expect(userProfileRepo.savePicture).toHaveBeenCalledTimes(1)
  })

  it('Should call LoadUserProfile when file is not provided', async () => {
    await sut.perform({ id: 'any_id' })

    expect(userProfileRepo.load).toHaveBeenCalledWith({ id: 'any_id' })
    expect(userProfileRepo.load).toHaveBeenCalledTimes(1)
  })

  it('Should call SaveUserPicture with initials when file is not provided', async () => {
    jest.mocked(userProfileRepo.load).mockResolvedValueOnce({ name: 'John Doe' })

    await sut.perform({ id: 'any_id' })

    expect(userProfileRepo.savePicture).toHaveBeenCalledWith({
      id: 'any_id',
      initials: 'JD'
    })
    expect(userProfileRepo.savePicture).toHaveBeenCalledTimes(1)
  })

  it('Should return correct data on success', async () => {
    jest.mocked(fileStorage.upload).mockResolvedValueOnce({ url: 'any_url' })

    const result = await sut.perform({ id: 'any_id', file: { buffer: file, mimeType: 'image/png' } })

    expect(result).toEqual({ pictureUrl: 'any_url', initials: undefined })
  })

  it('Should return initials when file is not provided', async () => {
    jest.mocked(userProfileRepo.load).mockResolvedValueOnce({ name: 'John Doe' })

    const result = await sut.perform({ id: 'any_id' })

    expect(result).toEqual({ pictureUrl: undefined, initials: 'JD' })
  })
})
