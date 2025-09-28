import { AccessToken } from '../../../src/domain/entities'

describe('AccessToken', () => {
  it('should create with correct values', () => {
    const sut = AccessToken.create('any_value', 1000)

    expect(sut).toBeInstanceOf(AccessToken)
  })

  it('should create with correct expiration date', () => {
    const expirationInMs = 1000
    const sut = AccessToken.create('any_value', expirationInMs)

    expect(sut.getExpirationDate).toEqual(new Date(Date.now() + expirationInMs))
  })

  it('should return false if token is not expired', () => {
    const sut = AccessToken.create('any_value', 1000000)

    expect(sut.isExpired()).toBe(false)
  })

  it('should return true if token is expired', () => {
    jest.useFakeTimers().setSystemTime(new Date('2021-01-01'))
    const sut = AccessToken.create('any_value', 1000)

    jest.useFakeTimers().setSystemTime(new Date('2021-01-01T00:00:02'))

    expect(sut.isExpired()).toBe(true)

    jest.useRealTimers()
  })
})
