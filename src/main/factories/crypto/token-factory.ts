import { JwtTokenGenerator } from '@/infra/crypto'
import { env } from '@/main/config/env'

export const makeToken = (): JwtTokenGenerator => {
  return new JwtTokenGenerator(env.jwtSecret)
}
