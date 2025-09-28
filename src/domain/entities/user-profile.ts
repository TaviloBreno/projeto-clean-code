export class UserProfile {
  constructor (
    public readonly id?: string,
    private pictureUrl?: string,
    private initials?: string
  ) {}

  setPicture ({ pictureUrl, name }: { pictureUrl?: string, name?: string }): void {
    this.pictureUrl = pictureUrl
    if (!pictureUrl && name) {
      const firstLetter = name.charAt(0).toUpperCase()
      const lastName = name.split(' ').pop()
      const lastLetter = lastName ? lastName.charAt(0).toUpperCase() : ''
      this.initials = `${firstLetter}${lastLetter}`
    } else {
      this.initials = undefined
    }
  }

  get picture (): { pictureUrl?: string | undefined, initials?: string | undefined } {
    return {
      pictureUrl: this.pictureUrl,
      initials: this.initials
    }
  }
}
