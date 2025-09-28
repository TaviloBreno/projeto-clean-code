import { type QueryRunner } from 'typeorm'
import { ConnectionManager } from '@/infra/db/typeorm/helpers/connection-manager'

export class TransactionManager {
  private static instance?: TransactionManager
  private readonly queryRunnerStack: QueryRunner[] = []

  private constructor () {}

  static getInstance (): TransactionManager {
    if (!TransactionManager.instance) {
      TransactionManager.instance = new TransactionManager()
    }
    return TransactionManager.instance
  }

  async openTransaction (): Promise<QueryRunner> {
    const connectionManager = ConnectionManager.getInstance()
    const queryRunner = await connectionManager.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    this.queryRunnerStack.push(queryRunner)
    return queryRunner
  }

  async closeTransaction (queryRunner: QueryRunner, shouldCommit: boolean): Promise<void> {
    try {
      if (shouldCommit) {
        await queryRunner.commitTransaction()
      } else {
        await queryRunner.rollbackTransaction()
      }
    } finally {
      await queryRunner.release()
      this.removeQueryRunner(queryRunner)
    }
  }

  async commitTransaction (queryRunner: QueryRunner): Promise<void> {
    await this.closeTransaction(queryRunner, true)
  }

  async rollbackTransaction (queryRunner: QueryRunner): Promise<void> {
    await this.closeTransaction(queryRunner, false)
  }

  getCurrentQueryRunner (): QueryRunner | undefined {
    return this.queryRunnerStack[this.queryRunnerStack.length - 1]
  }

  hasActiveTransaction (): boolean {
    return this.queryRunnerStack.length > 0
  }

  private removeQueryRunner (queryRunner: QueryRunner): void {
    const index = this.queryRunnerStack.indexOf(queryRunner)
    if (index > -1) {
      this.queryRunnerStack.splice(index, 1)
    }
  }

  async executeInTransaction<T> (operation: (queryRunner: QueryRunner) => Promise<T>): Promise<T> {
    const queryRunner = await this.openTransaction()

    try {
      const result = await operation(queryRunner)
      await this.commitTransaction(queryRunner)
      return result
    } catch (error) {
      await this.rollbackTransaction(queryRunner)
      throw error
    }
  }
}
