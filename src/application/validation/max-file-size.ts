import { type Validator } from '@/application/validation/validator'

export class MaxFileSize implements Validator {
  constructor (
    private readonly value: Buffer,
    private readonly maxSizeInMb: number
  ) {}

  validate (_input: any): Error | undefined {
    const maxSizeInBytes = this.maxSizeInMb * 1024 * 1024
    if (this.value.length > maxSizeInBytes) {
      return new Error(`File upload limit is ${this.maxSizeInMb}MB`)
    }
    return undefined
  }
}
