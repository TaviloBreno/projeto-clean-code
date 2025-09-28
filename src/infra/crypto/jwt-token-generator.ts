import jwt from 'jsonwebtoken'

import { type TokenGenerator } from '../../data/contracts/crypto'
import { type TokenValidator } from '../../data/contracts/crypto/token-validator'

export class JwtTokenGenerator implements TokenGenerator, TokenValidator {
  constructor (private readonly secret: string) {}

  async generate ({ key, expirationInMs }: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    return jwt.sign(
      { key },
      this.secret,
      {
        expiresIn: Math.floor(expirationInMs / 1000),
        subject: key
      }
    )
  }

  async validate ({ token }: TokenValidator.Params): Promise<TokenValidator.Result> {
    try {
      const payload = jwt.verify(token, this.secret) as any
      return payload.key
    } catch {
      return undefined
    }
  }
}
