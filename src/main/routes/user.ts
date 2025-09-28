import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-router'
import { adaptMiddleware } from '@/main/adapters/express-middleware'
import { makeSavePictureController } from '@/main/factories/controllers/save-picture'
import { makeDeletePictureController } from '@/main/factories/controllers/delete-picture'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth'
import multer from 'multer'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['image/png', 'image/jpg', 'image/jpeg']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error(`Unsupported file format: ${file.mimetype}`))
    }
  }
})

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
    adaptRoute(makeDeletePictureController()) as any
  )
}
