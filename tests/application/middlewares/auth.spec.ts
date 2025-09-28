import { AuthMiddleware } from '@/application/middlewares/auth'
import { type TokenValidator } from '@/data/contracts/crypto'
import { AccessDeniedError } from '@/application/errors/http'

describe('AuthMiddleware', () => {
  let sut: AuthMiddleware
  let tokenValidator: TokenValidator

  beforeAll(() => {
    tokenValidator = {
      validate: jest.fn()
    }
    sut = new AuthMiddleware(tokenValidator)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return 403 if authorization header is empty', async () => {
    const httpRequest = {
      headers: {}
    }

    const result = await sut.handle(httpRequest)

    expect(result).toEqual({
      statusCode: 403,
      data: new AccessDeniedError()
    })
  })

  it('Should return 403 if authorization header is not provided', async () => {
    const httpRequest = {}

    const result = await sut.handle(httpRequest)

    expect(result).toEqual({
      statusCode: 403,
      data: new AccessDeniedError()
    })
  })

  it('Should call TokenValidator with correct token', async () => {
    const httpRequest = {
      headers: { authorization: 'Bearer any_token' }
    }

    await sut.handle(httpRequest)

    expect(tokenValidator.validate).toHaveBeenCalledWith({ token: 'any_token' })
    expect(tokenValidator.validate).toHaveBeenCalledTimes(1)
  })

  it('Should return 403 if TokenValidator throws', async () => {
    jest.mocked(tokenValidator.validate).mockRejectedValueOnce(new Error())

    const httpRequest = {
      headers: { authorization: 'Bearer any_token' }
    }

    const result = await sut.handle(httpRequest)

    expect(result).toEqual({
      statusCode: 403,
      data: new AccessDeniedError()
    })
  })

  it('Should return 403 if TokenValidator returns undefined', async () => {
    jest.mocked(tokenValidator.validate).mockResolvedValueOnce(undefined)

    const httpRequest = {
      headers: { authorization: 'Bearer any_token' }
    }

    const result = await sut.handle(httpRequest)

    expect(result).toEqual({
      statusCode: 403,
      data: new AccessDeniedError()
    })
  })

  it('Should return 200 with userId on success', async () => {
    jest.mocked(tokenValidator.validate).mockResolvedValueOnce('any_user_id')

    const httpRequest = {
      headers: { authorization: 'Bearer any_token' }
    }

    const result = await sut.handle(httpRequest)

    expect(result).toEqual({
      statusCode: 200,
      data: { userId: 'any_user_id' }
    })
  })
})
