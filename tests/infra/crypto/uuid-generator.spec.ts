import { UuidGenerator } from '@/infra/crypto/uuid-generator'

describe('UuidGenerator', () => {
  let sut: UuidGenerator

  beforeEach(() => {
    sut = new UuidGenerator()
  })

  it('Should generate a valid UUID', () => {
    const uuid = sut.generate()

    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  })

  it('Should generate different UUIDs', () => {
    const uuid1 = sut.generate()
    const uuid2 = sut.generate()

    expect(uuid1).not.toBe(uuid2)
  })
})
