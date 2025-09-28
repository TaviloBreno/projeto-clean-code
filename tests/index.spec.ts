import { greeting } from '../src/index'

describe('greeting function', () => {
  it('should return a greeting message', () => {
    const result = greeting('Test')
    expect(result).toBe('Hello, Test!')
  })

  it('should handle empty string', () => {
    const result = greeting('')
    expect(result).toBe('Hello, !')
  })
})
