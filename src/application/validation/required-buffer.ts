import { type Validator } from '@/application/validation/validator'

export class RequiredBuffer implements Validator {
  constructor (
    private readonly value: Buffer | undefined,
    private readonly fieldName: string
  ) {}

  validate (_input: any): Error | undefined {
    if (!this.value || this.value.length === 0) {
      return new Error(`${this.fieldName} is required`)
    }
    return undefined
  }
}
