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
