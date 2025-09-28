export interface TokenGenerator {
  generate: (params: TokenGenerator.Params) => Promise<TokenGenerator.Result>
}

export namespace TokenGenerator {
  export interface Params {
    key: string
    expirationInMs: number
  }

  export type Result = string
}
