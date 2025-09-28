import jwt from 'jsonwebtoken'

import { type TokenGenerator } from '../../data/contracts/crypto'

export class JwtTokenGenerator implements TokenGenerator {
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
}
