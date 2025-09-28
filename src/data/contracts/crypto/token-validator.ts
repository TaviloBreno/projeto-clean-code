export interface TokenValidator {
  validate: (params: TokenValidator.Params) => Promise<TokenValidator.Result>
}

export namespace TokenValidator {
  export interface Params {
    token: string
  }
  export type Result = string | undefined
}
