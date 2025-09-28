export interface ChangeProfilePicture {
  perform: (params: ChangeProfilePicture.Params) => Promise<ChangeProfilePicture.Result>
}

export namespace ChangeProfilePicture {
  export interface Params {
    id: string
    file?: { buffer: Buffer, mimeType: string }
  }
  export interface Result {
    pictureUrl?: string | undefined
    initials?: string | undefined
  }
}
