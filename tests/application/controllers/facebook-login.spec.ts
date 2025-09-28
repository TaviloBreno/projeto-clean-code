import { FacebookLoginController } from '../../../src/application/controllers'
import { AuthenticationError } from '../../../src/application/errors/http'
import { type FacebookAuthentication } from '../../../src/domain/use-cases'
import { AccessToken } from '../../../src/domain/entities'

describe('FacebookLoginController', () => {
  let facebookAuth: jest.Mocked<FacebookAuthentication>
  let sut: FacebookLoginController
  let token: string

  beforeAll(() => {
    token = 'any_token'
    facebookAuth = {
      perform: jest.fn()
    }
    sut = new FacebookLoginController(facebookAuth)
  })

  beforeEach(() => {
    facebookAuth.perform.mockResolvedValue(AccessToken.create('any_value', 1000))
  })

  it('should return 400 if token is empty', async () => {
    const httpResponse = await sut.handle({
      body: { token: '' }
    })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('token is required')
    })
  })

  it('should return 400 if token is null', async () => {
    const httpResponse = await sut.handle({
      body: { token: null as any }
    })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('token is required')
    })
  })

  it('should return 400 if token is undefined', async () => {
    const httpResponse = await sut.handle({
      body: { token: undefined as any }
    })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('token is required')
    })
  })

  it('should call FacebookAuthentication with correct params', async () => {
    await sut.handle({ body: { token } })

    expect(facebookAuth.perform).toHaveBeenCalledWith({ token })
    expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if FacebookAuthentication returns undefined', async () => {
    facebookAuth.perform.mockResolvedValueOnce(undefined)

    const httpResponse = await sut.handle({ body: { token } })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new AuthenticationError()
    })
  })

  it('should return 200 with access token on success', async () => {
    const httpResponse = await sut.handle({ body: { token } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { accessToken: 'any_value' }
    })
  })

  it('should return 500 if FacebookAuthentication throws', async () => {
    const error = new Error('infra_error')
    facebookAuth.perform.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ body: { token } })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: error
    })
  })
})
