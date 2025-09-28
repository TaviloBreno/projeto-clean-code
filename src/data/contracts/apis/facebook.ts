export interface LoadFacebookUser {
  loadUser: (params: LoadFacebookUser.Params) => Promise<LoadFacebookUser.Result>
}

export namespace LoadFacebookUser {
  export interface Params {
    token: string
  }

  export type Result = {
    facebookId: string
    name: string
    email: string
  } | undefined
}
