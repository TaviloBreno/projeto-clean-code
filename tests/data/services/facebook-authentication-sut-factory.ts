import { FacebookAuthenticationService } from '../../../src/data/services'
import { type LoadFacebookUser } from '../../../src/data/contracts/apis'
import { type LoadUserAccount, type SaveFacebookAccount } from '../../../src/data/contracts/repos'
import { type TokenGenerator } from '../../../src/data/contracts/crypto'

import { mock, type MockProxy } from 'jest-mock-extended'

interface SutTypes {
  sut: FacebookAuthenticationService
  facebookApi: MockProxy<LoadFacebookUser>
  userAccountRepo: MockProxy<LoadUserAccount & SaveFacebookAccount>
  crypto: MockProxy<TokenGenerator>
}

export const makeSut = (): SutTypes => {
  const facebookApi = mock<LoadFacebookUser>()
  const userAccountRepo = mock<LoadUserAccount & SaveFacebookAccount>()
  const crypto = mock<TokenGenerator>()
  const sut = new FacebookAuthenticationService(facebookApi, userAccountRepo, crypto)

  return {
    sut,
    facebookApi,
    userAccountRepo,
    crypto
  }
}
