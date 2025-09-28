import { type FacebookAuthentication } from '@/domain/use-cases'
import { FacebookAuthenticationService } from '@/data/services'
import { makeFacebookApi } from '@/main/factories/apis/facebook-api-factory'
import { makeUserAccountRepo } from '@/main/factories/repositories/user-account-repository-factory'
import { makeToken } from '@/main/factories/crypto/token-factory'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return new FacebookAuthenticationService(
    makeFacebookApi(),
    makeUserAccountRepo(),
    makeToken()
  )
}
