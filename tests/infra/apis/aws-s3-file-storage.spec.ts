import { AwsS3FileStorage } from '@/infra/apis/aws-s3-file-storage'
import { type UuidGenerator } from '@/data/contracts/crypto/uuid-generator'

jest.mock('aws-sdk', () => ({
  S3: jest.fn().mockImplementation(() => ({
    upload: jest.fn().mockImplementation(() => ({
      promise: jest.fn().mockResolvedValue({ Location: 'any_url' })
    })),
    deleteObject: jest.fn().mockImplementation(() => ({
      promise: jest.fn().mockResolvedValue({})
    }))
  }))
}))

describe('AwsS3FileStorage', () => {
  let sut: AwsS3FileStorage
  let uuidGenerator: UuidGenerator

  beforeAll(() => {
    uuidGenerator = {
      generate: jest.fn().mockReturnValue('any_uuid')
    }
    sut = new AwsS3FileStorage('any_access_key', 'any_secret', 'any_bucket', uuidGenerator)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should upload file to S3', async () => {
    const file = Buffer.from('any_buffer')
    const fileName = 'any_file.png'

    const result = await sut.upload({ file, fileName })

    expect(result).toEqual({ url: 'https://any_bucket.s3.amazonaws.com/any_uuid.png' })
  })

  it('Should delete file from S3', async () => {
    const fileName = 'https://any_bucket.s3.amazonaws.com/any_file.png'

    await sut.delete({ fileName })

    expect(uuidGenerator.generate).not.toHaveBeenCalled()
  })
})
