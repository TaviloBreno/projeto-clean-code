export interface UploadFile {
  upload: (params: UploadFile.Params) => Promise<UploadFile.Result>
}

export namespace UploadFile {
  export interface Params {
    file: Buffer
    fileName: string
  }
  export interface Result {
    url: string
  }
}

export interface DeleteFile {
  delete: (params: DeleteFile.Params) => Promise<DeleteFile.Result>
}

export namespace DeleteFile {
  export interface Params {
    fileName: string
  }
  export type Result = undefined
}
