export const loginPath = {
  '/login/facebook': {
    post: {
      tags: ['Login'],
      summary: 'Autenticação com Facebook',
      description: 'Realiza autenticação usando token do Facebook e retorna JWT',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  description: 'Token de acesso do Facebook',
                  example: 'EAABwzLixnjYBAI7ZAzZAQjZBmOZAHvZCz...'
                }
              },
              required: ['token']
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Autenticação realizada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  accessToken: {
                    type: 'string',
                    description: 'JWT token para acesso à API',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Dados de entrada inválidos',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ValidationError'
              }
            }
          }
        },
        401: {
          description: 'Falha na autenticação',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthenticationError'
              }
            }
          }
        },
        500: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    }
  }
}
