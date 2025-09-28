import { AxiosHttpClient } from '../../../src/infra/http'

import axios from 'axios'

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let url: string
  let params: Record<string, string>
  let getSpy: jest.SpiedFunction<typeof axios.get>

  beforeAll(() => {
    sut = new AxiosHttpClient()
    url = 'any_url'
    params = {
      any: 'value'
    }
  })

  beforeEach(() => {
    getSpy = jest.spyOn(axios, 'get').mockResolvedValue({ data: 'any_data' })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should call axios.get with correct params', async () => {
    await sut.get({ url, params })

    expect(getSpy).toHaveBeenCalledWith(url, { params })
    expect(getSpy).toHaveBeenCalledTimes(1)
  })

  it('should return data on success', async () => {
    getSpy.mockResolvedValueOnce({ data: { value: 'any_value' } })

    const result = await sut.get<{ value: string }>({ url })

    expect(result).toEqual({ value: 'any_value' })
  })

  it('should rethrow if axios.get throws', async () => {
    getSpy.mockRejectedValueOnce(new Error('axios_error'))

    const promise = sut.get({ url })

    await expect(promise).rejects.toThrow(new Error('axios_error'))
  })
})
