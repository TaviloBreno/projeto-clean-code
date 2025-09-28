import { type UploadFile, type DeleteFile } from '@/data/contracts/apis/file-storage'

class MockFileStorage implements UploadFile, DeleteFile {
  async upload (params: UploadFile.Params): Promise<UploadFile.Result> {
    return { url: `http://any-storage.com/${params.fileName}` }
  }

  async delete (params: DeleteFile.Params): Promise<DeleteFile.Result> {
    console.log(`File ${params.fileName} deleted`)
    return undefined
  }
}

export const makeFileStorage = (): UploadFile & DeleteFile => {
  return new MockFileStorage()
}
