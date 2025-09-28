import { Controller } from '@/application/controllers/controller'
import { SavePictureController } from '@/application/controllers/save-picture'
import { type ChangeProfilePicture } from '@/domain/use-cases/change-profile-picture'

describe('SavePictureController', () => {
  let sut: SavePictureController
  let changeProfilePicture: ChangeProfilePicture

  beforeAll(() => {
    changeProfilePicture = {
      perform: jest.fn()
    }
    sut = new SavePictureController(changeProfilePicture)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should call ChangeProfilePicture with correct input', async () => {
    const httpRequest = {
      body: { userId: 'any_user_id' },
      file: { buffer: Buffer.from('any_buffer'), mimetype: 'image/png' }
    }

    await sut.handle(httpRequest)

    expect(changeProfilePicture.perform).toHaveBeenCalledWith({
      id: 'any_user_id',
      file: { buffer: Buffer.from('any_buffer'), mimeType: 'image/png' }
    })
    expect(changeProfilePicture.perform).toHaveBeenCalledTimes(1)
  })

  it('Should call ChangeProfilePicture without file', async () => {
    const httpRequest = {
      body: { userId: 'any_user_id' }
    }

    await sut.handle(httpRequest)

    expect(changeProfilePicture.perform).toHaveBeenCalledWith({
      id: 'any_user_id'
    })
    expect(changeProfilePicture.perform).toHaveBeenCalledTimes(1)
  })

  it('Should return 200 with correct data', async () => {
    jest.mocked(changeProfilePicture.perform).mockResolvedValueOnce({ pictureUrl: 'any_url', initials: undefined })

    const httpRequest = {
      body: { userId: 'any_user_id' },
      file: { buffer: Buffer.from('any_buffer'), mimetype: 'image/png' }
    }

    const result = await sut.handle(httpRequest)

    expect(result).toEqual({
      statusCode: 200,
      data: { pictureUrl: 'any_url', initials: undefined }
    })
  })

  it('Should return 200 with initials only', async () => {
    jest.mocked(changeProfilePicture.perform).mockResolvedValueOnce({ pictureUrl: undefined, initials: 'JD' })

    const httpRequest = {
      body: { userId: 'any_user_id' }
    }

    const result = await sut.handle(httpRequest)

    expect(result).toEqual({
      statusCode: 200,
      data: { pictureUrl: undefined, initials: 'JD' }
    })
  })
})
