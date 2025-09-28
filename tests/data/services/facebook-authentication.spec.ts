import { FacebookAuthenticationService } from '../../../src/data/services'
import { AccessToken, FacebookAccount } from '../../../src/domain/entities'
import { type LoadFacebookUser } from '../../../src/data/contracts/apis'
import { type LoadUserAccount, type SaveFacebookAccount } from '../../../src/data/contracts/repos'
import { type TokenGenerator } from '../../../src/data/contracts/crypto'

describe('FacebookAuthenticationService', () => {
  let facebookApi: jest.Mocked<LoadFacebookUser>
  let crypto: jest.Mocked<TokenGenerator>
  let userAccountRepo: jest.Mocked<LoadUserAccount & SaveFacebookAccount>
  let sut: FacebookAuthenticationService
  let token: string

  beforeAll(() => {
    token = 'any_token'
    facebookApi = {
      loadUser: jest.fn()
    }
    userAccountRepo = {
      load: jest.fn(),
      saveWithFacebook: jest.fn()
    }
    crypto = {
      generate: jest.fn()
    }
    sut = new FacebookAuthenticationService(facebookApi, userAccountRepo, crypto)
  })

  beforeEach(() => {
    facebookApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
    userAccountRepo.load.mockResolvedValue(undefined)
    userAccountRepo.saveWithFacebook.mockResolvedValue({ id: 'any_account_id' })
    crypto.generate.mockResolvedValue('any_generated_token')
  })

  it('should call LoadFacebookUser with correct params', async () => {
    await sut.perform({ token })

    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return undefined when LoadFacebookUser returns undefined', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)

    const result = await sut.perform({ token })

    expect(result).toBeUndefined()
  })

  it('should call LoadUserAccount when LoadFacebookUser returns data', async () => {
    await sut.perform({ token })

    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should call SaveFacebookAccount with FacebookAccount', async () => {
    await sut.perform({ token })

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith(new FacebookAccount({
      id: 'any_fb_id',
      name: 'any_fb_name',
      email: 'any_fb_email'
    }))
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it('should call TokenGenerator with correct params', async () => {
    await sut.perform({ token })

    expect(crypto.generate).toHaveBeenCalledWith({
      key: 'any_account_id',
      expirationInMs: AccessToken.expirationInMs
    })
    expect(crypto.generate).toHaveBeenCalledTimes(1)
  })

  it('should return an AccessToken on success', async () => {
    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(AccessToken.create('any_generated_token', AccessToken.expirationInMs))
  })

  it('should rethrow if LoadFacebookUser throws', async () => {
    facebookApi.loadUser.mockRejectedValueOnce(new Error('fb_error'))

    const promise = sut.perform({ token })

    await expect(promise).rejects.toThrow(new Error('fb_error'))
  })

  it('should rethrow if LoadUserAccount throws', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('load_error'))

    const promise = sut.perform({ token })

    await expect(promise).rejects.toThrow(new Error('load_error'))
  })

  it('should rethrow if SaveFacebookAccount throws', async () => {
    userAccountRepo.saveWithFacebook.mockRejectedValueOnce(new Error('save_error'))

    const promise = sut.perform({ token })

    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  it('should rethrow if TokenGenerator throws', async () => {
    crypto.generate.mockRejectedValueOnce(new Error('token_error'))

    const promise = sut.perform({ token })

    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
