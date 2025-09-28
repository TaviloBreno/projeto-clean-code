import { type DataSource } from 'typeorm'
import { FacebookApi } from '../../infra/apis'
import { AxiosHttpClient } from '../../infra/http'
import { JwtTokenGenerator } from '../../infra/crypto'
import { UserAccountRepository } from '../../infra/db/typeorm/repositories'
import { FacebookAuthenticationService } from '../../data/services'
import { FacebookLoginController } from '../../application/controllers'
import { env } from '../config/env'

export const makeFacebookLoginController = async (dataSource: DataSource): Promise<FacebookLoginController> => {
  const httpClient = new AxiosHttpClient()
  const facebookApi = new FacebookApi(
    env.facebookClientId,
    env.facebookClientSecret,
    httpClient
  )

  const crypto = new JwtTokenGenerator(env.jwtSecret)
  const userAccountRepo = new UserAccountRepository(dataSource)

  const facebookAuthService = new FacebookAuthenticationService(
    facebookApi,
    userAccountRepo,
    crypto
  )

  return new FacebookLoginController(facebookAuthService)
}
