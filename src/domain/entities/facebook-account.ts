export class FacebookAccount {
  public readonly id?: string
  public readonly name: string
  public readonly email: string
  public readonly facebookId: string

  constructor (
    fbData: { id: string, name: string, email: string },
    accountData?: { id: string, name: string }
  ) {
    this.id = accountData?.id
    this.name = accountData?.name ?? fbData.name
    this.email = fbData.email
    this.facebookId = fbData.id
  }
}
