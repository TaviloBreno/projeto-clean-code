import { DataSource } from 'typeorm'
import { env } from '@/main/config/env'
import { User } from '@/infra/db/typeorm/entities'

export const makeDataSource = (): DataSource => {
  return new DataSource({
    type: 'mysql',
    host: env.dbHost,
    port: Number(env.dbPort),
    username: env.dbUser,
    password: env.dbPass,
    database: env.dbName,
    entities: [User],
    synchronize: process.env['NODE_ENV'] !== 'production',
    logging: process.env['NODE_ENV'] !== 'production'
  })
}
