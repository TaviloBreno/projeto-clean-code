import { FacebookApi } from '@/infra/apis'
import { makeHttpClient } from '@/main/factories/http/http-client-factory'
import { env } from '@/main/config/env'

export const makeFacebookApi = (): FacebookApi => {
  return new FacebookApi(
    env.facebookClientId,
    env.facebookClientSecret,
    makeHttpClient()
  )
}
