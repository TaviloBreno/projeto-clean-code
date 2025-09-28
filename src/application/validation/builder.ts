import { RequiredStringValidator, ValidationComposite, type Validator } from './validator'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly fieldValue: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (fieldName: string, fieldValue: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, fieldValue)
  }

  required (): this {
    this.validators.push(new RequiredStringValidator(this.fieldName, this.fieldValue))
    return this
  }

  build (): ValidationComposite {
    return new ValidationComposite(this.validators)
  }
}
