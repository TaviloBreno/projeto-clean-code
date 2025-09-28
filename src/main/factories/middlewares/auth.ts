import { AuthMiddleware } from '@/application/middlewares/auth'
import { type TokenValidator } from '@/data/contracts/crypto'
import { makeJwtTokenGenerator } from '@/main/factories/crypto/jwt-token-generator'

export const makeAuthMiddleware = (): AuthMiddleware => {
  return new AuthMiddleware(makeJwtTokenGenerator() as TokenValidator)
}
