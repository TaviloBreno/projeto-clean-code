import { type DataSourceOptions } from 'typeorm'
import { env } from '@/main/config/env'
import { PgUser } from '@/infra/repos/postgres/entities/user'

const getDataSourceOptions = (): DataSourceOptions => {
  const baseOptions = {
    entities: [PgUser],
    synchronize: true,
    logging: env.nodeEnv === 'development'
  }

  if (env.nodeEnv === 'test') {
    return {
      ...baseOptions,
      type: 'sqlite' as const,
      database: ':memory:',
      dropSchema: true,
      synchronize: true
    }
  }

  return {
    ...baseOptions,
    type: 'postgres' as const,
    host: env.dbHost,
    port: env.dbPort,
    username: env.dbUser,
    password: env.dbPass,
    database: env.dbName,
    ssl: env.nodeEnv === 'production' ? { rejectUnauthorized: false } : false
  }
}

export { getDataSourceOptions }
