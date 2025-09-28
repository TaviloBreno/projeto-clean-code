import { S3 } from 'aws-sdk'
import { type UploadFile, type DeleteFile } from '@/data/contracts/apis/file-storage'
import { type UuidGenerator } from '@/data/contracts/crypto/uuid-generator'

export class AwsS3FileStorage implements UploadFile, DeleteFile {
  constructor (
    private readonly accessKey: string,
    private readonly secret: string,
    private readonly bucket: string,
    private readonly uuidGenerator: UuidGenerator
  ) {}

  async upload (params: UploadFile.Params): Promise<UploadFile.Result> {
    const s3 = new S3({
      accessKeyId: this.accessKey,
      secretAccessKey: this.secret
    })

    const extension = params.fileName.split('.').pop()
    const key = `${this.uuidGenerator.generate()}.${extension}`

    await s3.upload({
      Bucket: this.bucket,
      Key: key,
      Body: params.file,
      ACL: 'public-read'
    }).promise()

    return {
      url: `https://${this.bucket}.s3.amazonaws.com/${key}`
    }
  }

  async delete (params: DeleteFile.Params): Promise<DeleteFile.Result> {
    const s3 = new S3({
      accessKeyId: this.accessKey,
      secretAccessKey: this.secret
    })

    const key = params.fileName.split('/').pop()

    if (key) {
      await s3.deleteObject({
        Bucket: this.bucket,
        Key: key
      }).promise()
    }

    return undefined
  }
}
