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

export const userPath = {
  '/users/picture': {
    put: {
      tags: ['User'],
      summary: 'Atualizar foto de perfil',
      description: 'Faz upload de uma nova foto de perfil ou gera iniciais baseadas no nome',
      security: [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                picture: {
                  type: 'string',
                  format: 'binary',
                  description: 'Arquivo de imagem para o perfil'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Foto atualizada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  pictureUrl: {
                    type: 'string',
                    example: 'http://any-storage.com/user_id.png'
                  },
                  initials: {
                    type: 'string',
                    example: 'JD'
                  }
                }
              }
            }
          }
        },
        403: {
          $ref: '#/components/responses/AccessDenied'
        },
        500: {
          $ref: '#/components/responses/ServerError'
        }
      }
    },
    delete: {
      tags: ['User'],
      summary: 'Remover foto de perfil',
      description: 'Remove a foto de perfil e gera iniciais baseadas no nome',
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Foto removida com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  initials: {
                    type: 'string',
                    example: 'JD'
                  }
                }
              }
            }
          }
        },
        403: {
          $ref: '#/components/responses/AccessDenied'
        },
        500: {
          $ref: '#/components/responses/ServerError'
        }
      }
    }
  }
}
