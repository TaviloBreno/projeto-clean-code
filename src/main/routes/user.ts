import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-router'
import { adaptMiddleware } from '@/main/adapters/express-middleware'
import { makeSavePictureController } from '@/main/factories/controllers/save-picture'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

export default (router: Router): void => {
  router.put(
    '/users/picture',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    adaptMiddleware(makeAuthMiddleware()) as any,
    upload.single('picture'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    adaptRoute(makeSavePictureController()) as any
  )

  router.delete(
    '/users/picture',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    adaptMiddleware(makeAuthMiddleware()) as any,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    adaptRoute(makeSavePictureController()) as any
  )
}
