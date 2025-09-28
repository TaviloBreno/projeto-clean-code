import { type FacebookAuthentication } from '../../domain/use-cases'
import { AuthenticationError } from '../errors/http'
import { type HttpRequest, type HttpResponse, ok, unauthorized } from '../helpers/http'
import { ValidationBuilder, type Validator } from '../validation'
import { Controller } from './controller'

interface FacebookLoginRequest {
  token: string
}

export class FacebookLoginController extends Controller {
  constructor (private readonly facebookAuth: FacebookAuthentication) {
    super()
  }

  async perform (httpRequest: HttpRequest<FacebookLoginRequest>): Promise<HttpResponse> {
    const accessToken = await this.facebookAuth.perform({
      token: httpRequest.body?.token ?? ''
    })

    if (accessToken === undefined) {
      return unauthorized(new AuthenticationError())
    }

    return ok({
      accessToken: accessToken.getValue
    })
  }

  buildValidators (httpRequest: HttpRequest<FacebookLoginRequest>): Validator {
    return ValidationBuilder
      .of('token', httpRequest.body?.token ?? '')
      .required()
      .build()
  }
}
