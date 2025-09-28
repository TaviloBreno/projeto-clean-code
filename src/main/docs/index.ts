import { loginPath, userPath } from './paths'
import { authenticationErrorComponent, serverErrorComponent, validationErrorComponent } from './components'

const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Facebook Login API',
    description: 'API para autenticação com Facebook usando Clean Architecture e TDD',
    version: '1.0.0',
    contact: {
      name: 'API Support',
      email: 'support@facebook-login-api.com'
    }
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor Principal'
    }
  ],
  tags: [
    {
      name: 'Login',
      description: 'APIs relacionadas à autenticação'
    },
    {
      name: 'User',
      description: 'APIs relacionadas ao perfil do usuário'
    }
  ],
  paths: {
    ...loginPath,
    ...userPath
  },
  components: {
    schemas: {
      ...authenticationErrorComponent,
      ...serverErrorComponent,
      ...validationErrorComponent
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    responses: {
      AccessDenied: {
        description: 'Acesso negado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  example: 'Access denied'
                }
              }
            }
          }
        }
      }
    }
  }
}

export default swaggerConfig
