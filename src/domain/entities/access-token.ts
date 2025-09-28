export class AccessToken {
  static readonly expirationInMs: number = 30 * 60 * 1000 // 30 minutes

  constructor (
    private readonly value: string,
    private readonly expirationDate: Date
  ) {}

  public static create (value: string, expirationInMs: number): AccessToken {
    const expirationDate = new Date(Date.now() + expirationInMs)
    return new AccessToken(value, expirationDate)
  }

  public get getValue (): string {
    return this.value
  }

  public get getExpirationDate (): Date {
    return this.expirationDate
  }

  public isExpired (): boolean {
    return this.expirationDate < new Date()
  }
}
