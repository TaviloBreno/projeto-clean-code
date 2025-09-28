export interface LoadUserAccount {
  load: (params: LoadUserAccount.Params) => Promise<LoadUserAccount.Result>
}

export namespace LoadUserAccount {
  export interface Params {
    email: string
  }

  export type Result = {
    id: string
    name: string
  } | undefined
}

export interface SaveFacebookAccount {
  saveWithFacebook: (params: SaveFacebookAccount.Params) => Promise<SaveFacebookAccount.Result>
}

export namespace SaveFacebookAccount {
  export interface Params {
    id?: string
    email: string
    name: string
    facebookId: string
  }

  export interface Result {
    id: string
  }
}
