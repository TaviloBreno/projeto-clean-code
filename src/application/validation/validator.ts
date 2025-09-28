import { ValidationError } from '../errors/http'

export interface Validator {
  validate: (input: any) => Error | undefined
}

export class RequiredStringValidator implements Validator {
  constructor (
    private readonly fieldName: string,
    private readonly value: string
  ) {}

  validate (): Error | undefined {
    if (this.value?.length === 0 || this.value === null || this.value === undefined) {
      return new ValidationError(`${this.fieldName} is required`)
    }
    return undefined
  }
}

export class ValidationComposite implements Validator {
  constructor (private readonly validators: Validator[]) {}

  validate (input: any): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error !== undefined) {
        return error
      }
    }
    return undefined
  }
}
