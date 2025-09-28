import { DataSource, type QueryRunner } from 'typeorm'
import { getDataSourceOptions } from '@/infra/db/typeorm/config/data-source'

export class ConnectionManager {
  private static instance?: ConnectionManager
  private dataSource?: DataSource

  private constructor () {}

  static getInstance (): ConnectionManager {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager()
    }
    return ConnectionManager.instance
  }

  async connect (): Promise<DataSource> {
    if (!this.dataSource || !this.dataSource.isInitialized) {
      this.dataSource = new DataSource(getDataSourceOptions())
      await this.dataSource.initialize()
    }
    return this.dataSource
  }

  async disconnect (): Promise<void> {
    if (this.dataSource && this.dataSource.isInitialized) {
      await this.dataSource.destroy()
      delete this.dataSource
    }
  }

  getDataSource (): DataSource {
    if (!this.dataSource || !this.dataSource.isInitialized) {
      throw new Error('Database connection not established. Call connect() first.')
    }
    return this.dataSource
  }

  async createQueryRunner (): Promise<QueryRunner> {
    const dataSource = await this.connect()
    return dataSource.createQueryRunner()
  }
}
