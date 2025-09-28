export interface HttpRequest<T = any> {
  body?: T
}

export interface HttpResponse<T = any> {
  statusCode: number
  data: T
}

export const ok = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const unauthorized = (error: Error): HttpResponse<Error> => ({
  statusCode: 401,
  data: error
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  data: error
})
