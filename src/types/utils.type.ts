export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
export interface SuccessRepone<Data> {
  message: string
  data: Data
}
