export const authenticationErrorComponent = {
  AuthenticationError: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'AuthenticationError'
      },
      message: {
        type: 'string',
        example: 'Authentication failed'
      }
    }
  }
}

export const validationErrorComponent = {
  ValidationError: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'ValidationError'
      },
      message: {
        type: 'string',
        example: 'token is required'
      }
    }
  }
}

export const serverErrorComponent = {
  ServerError: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Error'
      },
      message: {
        type: 'string',
        example: 'Internal server error'
      }
    }
  }
}
