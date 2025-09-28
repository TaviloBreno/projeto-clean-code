import { type HttpRequest, type HttpResponse, badRequest, serverError } from '../helpers/http'
import { type Validator } from '../validation/validator'

export abstract class Controller {
  abstract perform (httpRequest: HttpRequest): Promise<HttpResponse>

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validate(httpRequest)
    if (error !== undefined) {
      return badRequest(error)
    }

    try {
      return await this.perform(httpRequest)
    } catch (error) {
      return serverError(error as Error)
    }
  }

  private validate (httpRequest: HttpRequest): Error | undefined {
    const validator = this.buildValidators(httpRequest)
    return validator?.validate(httpRequest)
  }

  abstract buildValidators (httpRequest: HttpRequest): Validator | undefined
}
