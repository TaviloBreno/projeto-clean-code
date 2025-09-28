import { Controller } from '@/application/controllers/controller'
import { type HttpRequest, type HttpResponse, ok } from '@/application/helpers/http'
import { type ChangeProfilePicture } from '@/domain/use-cases/change-profile-picture'
import { type Validator } from '@/application/validation'

interface MulterFile {
  buffer: Buffer
  mimetype: string
}

interface HttpRequestWithFile extends HttpRequest {
  file?: MulterFile
}

export class SavePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  async perform (httpRequest: HttpRequestWithFile): Promise<HttpResponse> {
    const { userId } = httpRequest.body

    const file = httpRequest.file
      ? { buffer: httpRequest.file.buffer, mimeType: httpRequest.file.mimetype }
      : undefined

    const result = await this.changeProfilePicture.perform({
      id: userId,
      ...(file && { file })
    })

    return ok(result)
  }

  override buildValidators (_httpRequest: HttpRequest): Validator | undefined {
    return undefined
  }
}
