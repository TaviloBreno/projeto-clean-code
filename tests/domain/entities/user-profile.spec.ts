import { UserProfile } from '@/domain/entities/user-profile'

describe('UserProfile', () => {
  let sut: UserProfile

  beforeEach(() => {
    sut = new UserProfile('any_id')
  })

  it('Should create with empty initials and pictureUrl', () => {
    expect(sut.picture).toEqual({ pictureUrl: undefined, initials: undefined })
  })

  it('Should set pictureUrl', () => {
    sut.setPicture({ pictureUrl: 'any_url' })

    expect(sut.picture).toEqual({ pictureUrl: 'any_url', initials: undefined })
  })

  it('Should set initials with first and last name', () => {
    sut.setPicture({ name: 'John Doe' })

    expect(sut.picture).toEqual({ pictureUrl: undefined, initials: 'JD' })
  })

  it('Should set initials with first name only', () => {
    sut.setPicture({ name: 'John' })

    expect(sut.picture).toEqual({ pictureUrl: undefined, initials: 'JJ' })
  })

  it('Should set initials with first and last name ignoring middle names', () => {
    sut.setPicture({ name: 'John Michael Doe' })

    expect(sut.picture).toEqual({ pictureUrl: undefined, initials: 'JD' })
  })

  it('Should not set initials if pictureUrl is provided', () => {
    sut.setPicture({ pictureUrl: 'any_url', name: 'John Doe' })

    expect(sut.picture).toEqual({ pictureUrl: 'any_url', initials: undefined })
  })
})
