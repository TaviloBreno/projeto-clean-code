import { JwtTokenGenerator } from '@/infra/crypto/jwt-token-generator'

export const makeJwtTokenGenerator = (): JwtTokenGenerator => {
  return new JwtTokenGenerator(process.env['JWT_SECRET'] ?? 'test-secret')
}
