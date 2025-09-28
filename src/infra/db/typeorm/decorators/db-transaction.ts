import { TransactionManager } from '@/infra/db/typeorm/helpers/transaction-manager'

export function DbTransaction (_target: any, _propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const method = descriptor.value

  descriptor.value = async function (...args: any[]): Promise<any> {
    const transactionManager = TransactionManager.getInstance()

    if (transactionManager.hasActiveTransaction()) {
      // Se já existe uma transação ativa, apenas executa o método
      return await method.apply(this, args)
    }

    // Senão, abre uma nova transação
    return await transactionManager.executeInTransaction(async () => {
      return await method.apply(this, args)
    })
  }

  return descriptor
}
