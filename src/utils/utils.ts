import { Axios, AxiosError, HttpStatusCode, isAxiosError } from 'axios'

// Covert Error type unkown to type can import
export function isAxiosErrorFunc<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
