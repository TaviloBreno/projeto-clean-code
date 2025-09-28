import { Controller } from '@/application/controllers/controller'
import { type HttpRequest, type HttpResponse, ok } from '@/application/helpers/http'
import { type ChangeProfilePicture } from '@/domain/use-cases/change-profile-picture'
import { type Validator } from '@/application/validation'

export class DeletePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.body

    const result = await this.changeProfilePicture.perform({ id: userId })

    return ok(result)
  }

  override buildValidators (_httpRequest: HttpRequest): Validator | undefined {
    return undefined
  }
}
