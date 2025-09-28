import { DeletePictureController } from '@/application/controllers/delete-picture'
import { type ChangeProfilePicture } from '@/domain/use-cases/change-profile-picture'

describe('DeletePictureController', () => {
  let sut: DeletePictureController
  let changeProfilePicture: ChangeProfilePicture

  beforeAll(() => {
    changeProfilePicture = {
      perform: jest.fn()
    }
    sut = new DeletePictureController(changeProfilePicture)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should call ChangeProfilePicture with correct input', async () => {
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
