import type { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeFacebookLoginController } from '@/main/factories/controllers/facebook-login-controller-factory'

export default (router: Router): void => {
  router.post('/auth/facebook', adaptRoute(makeFacebookLoginController()))
}
