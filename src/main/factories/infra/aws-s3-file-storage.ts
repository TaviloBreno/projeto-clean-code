import { AwsS3FileStorage } from '@/infra/apis/aws-s3-file-storage'
import { makeUuidGenerator } from '@/main/factories/crypto/uuid-generator'
import { type UploadFile, type DeleteFile } from '@/data/contracts/apis/file-storage'

export const makeAwsS3FileStorage = (): UploadFile & DeleteFile => {
  return new AwsS3FileStorage(
    process.env['AWS_S3_ACCESS_KEY'] ?? '',
    process.env['AWS_S3_SECRET'] ?? '',
    process.env['AWS_S3_BUCKET'] ?? '',
    makeUuidGenerator()
  )
}
