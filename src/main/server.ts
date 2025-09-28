import 'module-alias/register'
import { env } from '@/main/config/env'
import { app } from '@/main/config/app'

const server = app.listen(env.port, () => {
  console.log(`🚀 Server running at http://localhost:${env.port}`)
  console.log(`📚 API Documentation available at http://localhost:${env.port}/api-docs`)
})

export { server }
