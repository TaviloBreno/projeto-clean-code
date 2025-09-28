import { type FacebookAuthentication } from '../../domain/use-cases'
import { AccessToken, FacebookAccount } from '../../domain/entities'
import { type LoadFacebookUser } from '../contracts/apis'
import { type LoadUserAccount, type SaveFacebookAccount } from '../contracts/repos'
import { type TokenGenerator } from '../contracts/crypto'

type Setup = FacebookAuthentication.Params
type Output = FacebookAuthentication.Result

export class FacebookAuthenticationService implements FacebookAuthentication {
  constructor (
    private readonly facebookApi: LoadFacebookUser,
    private readonly userAccountRepo: LoadUserAccount & SaveFacebookAccount,
    private readonly crypto: TokenGenerator
  ) {}

  async perform ({ token }: Setup): Promise<Output> {
    const fbData = await this.facebookApi.loadUser({ token })
    if (fbData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: fbData.email })
      const fbAccount = new FacebookAccount({
        id: fbData.facebookId,
        name: fbData.name,
        email: fbData.email
      }, accountData)
      const { id } = await this.userAccountRepo.saveWithFacebook(fbAccount)

      const accessToken = await this.crypto.generate({
        key: id,
        expirationInMs: AccessToken.expirationInMs
      })

      return AccessToken.create(accessToken, AccessToken.expirationInMs)
    }
    return undefined
  }
}
