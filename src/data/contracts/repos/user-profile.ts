export interface SaveUserPicture {
  savePicture: (params: SaveUserPicture.Params) => Promise<SaveUserPicture.Result>
}

export namespace SaveUserPicture {
  export interface Params {
    id: string
    pictureUrl?: string
    initials?: string
  }
  export type Result = undefined
}

export interface LoadUserProfile {
  load: (params: LoadUserProfile.Params) => Promise<LoadUserProfile.Result>
}

export namespace LoadUserProfile {
  export interface Params {
    id: string
  }
  export interface Result {
    name?: string
  }
}
