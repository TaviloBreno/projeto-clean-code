import { JwtTokenGenerator } from '../../../src/infra/crypto'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtTokenGenerator', () => {
  let sut: JwtTokenGenerator
  let secret: string
  let key: string
  let expirationInMs: number
  const mockedJwt = jest.mocked(jwt)

  beforeAll(() => {
    secret = 'any_secret'
    key = 'any_key'
    expirationInMs = 1800000
    sut = new JwtTokenGenerator(secret)
  })

  beforeEach(() => {
    mockedJwt.sign.mockReset()
    mockedJwt.sign.mockImplementation(() => 'any_signed_token')
  })

  it('should call jwt.sign with correct params', async () => {
    await sut.generate({ key, expirationInMs })

    expect(mockedJwt.sign).toHaveBeenCalledWith(
      { key },
      secret,
      {
        expiresIn: Math.floor(expirationInMs / 1000),
        subject: key
      }
    )
  })

  it('should return a token on success', async () => {
    mockedJwt.sign.mockImplementationOnce(() => 'token_value')

    const token = await sut.generate({ key, expirationInMs })

    expect(token).toBe('token_value')
  })

  it('should rethrow if jwt.sign throws', async () => {
    mockedJwt.sign.mockImplementationOnce(() => {
      throw new Error('jwt_error')
    })

    const promise = sut.generate({ key, expirationInMs })

    await expect(promise).rejects.toThrow(new Error('jwt_error'))
  })
})
