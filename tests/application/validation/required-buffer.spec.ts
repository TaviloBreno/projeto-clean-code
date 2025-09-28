import { RequiredBuffer } from '@/application/validation/required-buffer'

describe('RequiredBuffer', () => {
  it('Should return error if buffer is undefined', () => {
    const sut = new RequiredBuffer(undefined, 'file')

    const result = sut.validate({})

    expect(result).toEqual(new Error('file is required'))
  })

  it('Should return error if buffer is empty', () => {
    const sut = new RequiredBuffer(Buffer.from(''), 'file')

    const result = sut.validate({})

    expect(result).toEqual(new Error('file is required'))
  })

  it('Should return undefined if buffer is valid', () => {
    const sut = new RequiredBuffer(Buffer.from('any_buffer'), 'file')

    const result = sut.validate({})

    expect(result).toBeUndefined()
  })
})
