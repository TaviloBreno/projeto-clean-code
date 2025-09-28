export class AuthenticationError extends Error {
  constructor () {
    super('Authentication failed')
    this.name = 'AuthenticationError'
  }
}

export class ValidationError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class AccessDeniedError extends Error {
  constructor () {
    super('Access denied')
    this.name = 'AccessDeniedError'
  }
}
