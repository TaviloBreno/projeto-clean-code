import { FacebookApi } from '../../../src/infra/apis'
import { type HttpGetClient } from '../../../src/data/contracts/http'
import { type LoadFacebookUser } from '../../../src/data/contracts/apis'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('FacebookApi', () => {
  let clientId: string
  let clientSecret: string
  let token: string
  let httpClient: MockProxy<HttpGetClient>
  let sut: FacebookApi

  const appTokenResult = { access_token: 'any_app_token' }
  const debugTokenResult = { data: { user_id: 'any_fb_id' } }
  const userInfoResult = { id: 'any_fb_id', name: 'any_fb_name', email: 'any_fb_email' }

  const mockSuccess = (): void => {
    httpClient.get
      .mockResolvedValueOnce(appTokenResult)
      .mockResolvedValueOnce(debugTokenResult)
      .mockResolvedValueOnce(userInfoResult)
  }

  beforeAll(() => {
    clientId = 'any_client_id'
    clientSecret = 'any_client_secret'
    token = 'any_token'
    httpClient = mock<HttpGetClient>()
    sut = new FacebookApi(clientId, clientSecret, httpClient)
  })

  beforeEach(() => {
    httpClient.get.mockReset()
    mockSuccess()
  })

  it('should get app token using client credentials', async () => {
    await sut.loadUser({ token })

    expect(httpClient.get).toHaveBeenNthCalledWith(1, {
      url: 'https://graph.facebook.com/oauth/access_token',
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    })
  })

  it('should debug user token using app token', async () => {
    await sut.loadUser({ token })

    expect(httpClient.get).toHaveBeenNthCalledWith(2, {
      url: 'https://graph.facebook.com/debug_token',
      params: {
        access_token: appTokenResult.access_token,
        input_token: token
      }
    })
  })

  it('should load user info using the debugged user id', async () => {
    await sut.loadUser({ token })

    expect(httpClient.get).toHaveBeenNthCalledWith(3, {
      url: `https://graph.facebook.com/${debugTokenResult.data.user_id}`,
      params: {
        fields: 'id,name,email'
      }
    })
  })

  it('should return facebook user on success', async () => {
    const user = await sut.loadUser({ token })

    expect(user).toEqual<LoadFacebookUser.Result>({
      facebookId: userInfoResult.id,
      name: userInfoResult.name,
      email: userInfoResult.email
    })
  })

  it('should return undefined if HttpGetClient returns undefined', async () => {
    httpClient.get.mockReset()
    httpClient.get
      .mockResolvedValueOnce(appTokenResult)
      .mockResolvedValueOnce(debugTokenResult)
      .mockResolvedValueOnce(undefined as any)

    const user = await sut.loadUser({ token })

    expect(user).toBeUndefined()
  })

  it('should return undefined if debug token returns undefined user id', async () => {
    httpClient.get.mockReset()
    httpClient.get
      .mockResolvedValueOnce(appTokenResult)
      .mockResolvedValueOnce({ data: {} })

    const user = await sut.loadUser({ token })

    expect(user).toBeUndefined()
  })
})
