import { type Middleware } from '@/application/middlewares/middleware'
import { type HttpRequest, type HttpResponse, forbidden, ok } from '@/application/helpers/http'
import { AccessDeniedError } from '@/application/errors/http'
import { type TokenValidator } from '@/data/contracts/crypto'

export class AuthMiddleware implements Middleware {
  constructor (private readonly tokenValidator: TokenValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { authorization } = httpRequest.headers ?? {}
    if (authorization) {
      try {
        const token = authorization.replace(/^Bearer /, '')
        const userId = await this.tokenValidator.validate({ token })
        if (userId) {
          return ok({ userId })
        }
      } catch {}
    }
    const accessDeniedError = new AccessDeniedError()
    return forbidden(accessDeniedError as Error)
  }
}
