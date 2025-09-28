import { ValidationBuilder, type ValidationComposite } from '@/application/validation'

export const makeValidationComposite = (): ValidationComposite => {
  return ValidationBuilder.of('token', '').required().build()
}
