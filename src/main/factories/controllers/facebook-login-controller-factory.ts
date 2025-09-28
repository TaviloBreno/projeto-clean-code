import { FacebookLoginController } from '@/application/controllers'
import { makeFacebookAuthentication } from '@/main/factories/use-cases/facebook-authentication-factory'

export const makeFacebookLoginController = (): FacebookLoginController => {
  return new FacebookLoginController(makeFacebookAuthentication())
}
