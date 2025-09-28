import { type Validator } from '@/application/validation/validator'
import { RequiredBuffer } from '@/application/validation/required-buffer'
import { AllowedMimeTypes } from '@/application/validation/allowed-mime-types'
import { MaxFileSize } from '@/application/validation/max-file-size'

interface UploadedFile {
  mimeType: string
  buffer: Buffer
}

export class ValidationBuilder {
  private constructor (
    private readonly value: unknown,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (params: { value: unknown, fieldName: string }): ValidationBuilder {
    return new ValidationBuilder(params.value, params.fieldName)
  }

  required (): this {
    if (Buffer.isBuffer(this.value)) {
      this.validators.push(new RequiredBuffer(this.value, this.fieldName))
    }
    return this
  }

  image ({
    allowed,
    maxSizeInMb
  }: {
    allowed: string[]
    maxSizeInMb: number
  }): this {
    const file = this.value as Partial<UploadedFile>

    if (file.mimeType && typeof file.mimeType === 'string') {
      this.validators.push(new AllowedMimeTypes(file.mimeType, allowed))
    }

    if (file.buffer && Buffer.isBuffer(file.buffer)) {
      this.validators.push(new MaxFileSize(file.buffer, maxSizeInMb))
    }

    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
