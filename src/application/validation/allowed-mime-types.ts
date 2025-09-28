import { type Validator } from '@/application/validation/validator'

export class AllowedMimeTypes implements Validator {
  constructor (
    private readonly value: string,
    private readonly allowed: string[]
  ) {}

  validate (_input: any): Error | undefined {
    if (!this.allowed.includes(this.value)) {
      return new Error(`Unsupported file format: ${this.value}`)
    }
    return undefined
  }
}
