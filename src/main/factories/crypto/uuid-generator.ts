import { UuidGenerator } from '@/infra/crypto/uuid-generator'

export const makeUuidGenerator = (): UuidGenerator => {
  return new UuidGenerator()
}
