import { FacebookAccount } from '../../../src/domain/entities'

describe('FacebookAccount', () => {
  const fbData = {
    id: 'any_fb_id',
    name: 'any_fb_name',
    email: 'any_fb_email'
  }

  it('should create with facebook data only', () => {
    const sut = new FacebookAccount(fbData)

    expect(sut).toEqual({
      id: undefined,
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
  })

  it('should update name if account exists', () => {
    const accountData = { id: 'any_id', name: 'any_name' }
    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
  })

  it('should not update name if account has no name', () => {
    const accountData = { id: 'any_id', name: '' }
    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: '',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
  })
})
