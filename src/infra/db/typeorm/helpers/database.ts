import { DataSource } from 'typeorm'
import { User } from '../entities'

export const createMemoryDatabase = async (): Promise<DataSource> => {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [User],
    synchronize: true
  })

  return await dataSource.initialize()
}

export const createTestDatabase = async (): Promise<DataSource> => {
  return await createMemoryDatabase()
}
