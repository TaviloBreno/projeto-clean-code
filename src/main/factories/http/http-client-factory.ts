import { AxiosHttpClient } from '@/infra/http'

export const makeHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
