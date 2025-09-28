import { Controller } from '@/application/controllers/controller'
import { type HttpRequest, type HttpResponse, ok } from '@/application/helpers/http'
import { type ChangeProfilePicture } from '@/domain/use-cases/change-profile-picture'
import { type Validator } from '@/application/validation'
import { ValidationBuilder } from '@/application/validation/validation-builder'

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

  override buildValidators (httpRequest: HttpRequestWithFile): Validator | undefined {
    if (!httpRequest.file) {
      return {
        validate: () => new Error('file is required')
      }
    }

    const validators = ValidationBuilder
      .of({ value: httpRequest.file, fieldName: 'file' })
      .required()
      .image({ allowed: ['image/png', 'image/jpg', 'image/jpeg'], maxSizeInMb: 5 })
      .build()

    return {
      validate: (input: any) => {
        for (const validator of validators) {
          const error = validator.validate(input)
          if (error) return error
        }
        return undefined
      }
    }
  }
}
