import { type LoadFacebookUser } from '../../data/contracts/apis'
import { type HttpGetClient } from '../../data/contracts/http'

interface AppTokenResponse {
  access_token?: string
}

interface DebugTokenResponse {
  data?: {
    user_id?: string
  }
}

interface UserInfoResponse {
  id?: string
  name?: string
  email?: string
}

const BASE_URL = 'https://graph.facebook.com'
const APP_TOKEN_URL = `${BASE_URL}/oauth/access_token`
const DEBUG_TOKEN_URL = `${BASE_URL}/debug_token`

export class FacebookApi implements LoadFacebookUser {
  constructor (
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly httpClient: HttpGetClient
  ) {}

  async loadUser ({ token }: LoadFacebookUser.Params): Promise<LoadFacebookUser.Result> {
    const appToken = await this.loadAppToken()
    if (appToken === undefined) {
      return undefined
    }

    const userId = await this.loadDebugToken(token, appToken)
    if (userId === undefined) {
      return undefined
    }

    return await this.loadUserInfo(userId)
  }

  private async loadAppToken (): Promise<string | undefined> {
    const result = await this.httpClient.get<AppTokenResponse>({
      url: APP_TOKEN_URL,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      }
    })

    return result?.access_token
  }

  private async loadDebugToken (inputToken: string, appToken: string): Promise<string | undefined> {
    const result = await this.httpClient.get<DebugTokenResponse>({
      url: DEBUG_TOKEN_URL,
      params: {
        access_token: appToken,
        input_token: inputToken
      }
    })

    return result?.data?.user_id
  }

  private async loadUserInfo (userId: string): Promise<LoadFacebookUser.Result> {
    const result = await this.httpClient.get<UserInfoResponse>({
      url: `${BASE_URL}/${userId}`,
      params: {
        fields: 'id,name,email'
      }
    })

    if (result?.id === undefined || result.name === undefined || result.email === undefined) {
      return undefined
    }

    return {
      facebookId: result.id,
      name: result.name,
      email: result.email
    }
  }
}
