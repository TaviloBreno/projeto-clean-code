import axios from 'axios'

import { type HttpGetClient } from '../../data/contracts/http'

export class AxiosHttpClient implements HttpGetClient {
  async get<T = any>({ url, params }: HttpGetClient.Params): Promise<T> {
    const { data } = await axios.get<T>(url, { params })
    return data
  }
}
