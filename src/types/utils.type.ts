export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
export interface SuccessRepone<Data> {
  message: string
  data: Data
}

// cu phap `-?:`  se loai bo undifine cua key optional
export type NoUndefineField<T> = {
  [P in keyof T]-?: NoUndefineField<NonNullable<T[P]>>
}
