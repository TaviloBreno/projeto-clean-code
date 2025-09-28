import {
  type Repository,
  type EntityTarget,
  type ObjectLiteral,
  type FindOneOptions,
  type FindManyOptions,
  type FindOptionsWhere,
  type UpdateResult,
  type DeleteResult
} from 'typeorm'
import { ConnectionManager } from '@/infra/db/typeorm/helpers/connection-manager'
import { TransactionManager } from '@/infra/db/typeorm/helpers/transaction-manager'

export abstract class BaseRepository<T extends ObjectLiteral> {
  constructor (private readonly entity: EntityTarget<T>) {}

  protected getRepository (): Repository<T> {
    const transactionManager = TransactionManager.getInstance()

    if (transactionManager.hasActiveTransaction()) {
      const queryRunner = transactionManager.getCurrentQueryRunner()
      if (queryRunner) {
        return queryRunner.manager.getRepository(this.entity)
      }
    }

    const connectionManager = ConnectionManager.getInstance()
    const dataSource = connectionManager.getDataSource()
    return dataSource.getRepository(this.entity)
  }

  protected async save (data: T): Promise<T> {
    const repository = this.getRepository()
    return await repository.save(data)
  }

  protected async findOne (options: FindOneOptions<T>): Promise<T | null> {
    const repository = this.getRepository()
    return await repository.findOne(options)
  }

  protected async find (options?: FindManyOptions<T>): Promise<T[]> {
    const repository = this.getRepository()
    return await repository.find(options)
  }

  protected async update (criteria: FindOptionsWhere<T>, partialEntity: Partial<T>): Promise<UpdateResult> {
    const repository = this.getRepository()
    return await repository.update(criteria, partialEntity)
  }

  protected async delete (criteria: FindOptionsWhere<T>): Promise<DeleteResult> {
    const repository = this.getRepository()
    return await repository.delete(criteria)
  }

  protected async exists (options: FindManyOptions<T>): Promise<boolean> {
    const repository = this.getRepository()
    const count = await repository.count(options)
    return count > 0
  }
}
