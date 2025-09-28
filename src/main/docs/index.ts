import { loginPath } from './paths'
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
    }
  ],
  paths: {
    ...loginPath
  },
  components: {
    schemas: {
      ...authenticationErrorComponent,
      ...serverErrorComponent,
      ...validationErrorComponent
    }
  }
}

export default swaggerConfig
